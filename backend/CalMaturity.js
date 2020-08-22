require("dotenv").config();
const cron = require("cron");
const Services = require("./models/services");
const ServiceTypes = require("./models/service-types");
const Op = require("sequelize").Op;
const Accounts = require("./models/accounts");
const Send = require("./services/send-email");

const listCustomers = async () => {
  let temp = [];
  try {
    const list = await Services.findAll({
      attributes: ["id","balance", "maturity", "accountId", "cycle","createdAt"],
      where: {
        serviceType: {
          [Op.ne]: 0,
        },
        maturity: {
          [Op.ne]: null,
        },
      },
      include: [
        {
          model: ServiceTypes,
          attributes: ["value", "maturity"],
        },
        {
          model: Accounts,
          attributes: ["email"],
        },
      ],
    });

    if (list.length > 0) {
      list.forEach((item) => {
        const account = {
          id: item.id,
          balance: item.balance,
          maturity: item.maturity,
          accountId: item.accountId,
          createdAt: item.createdAt,
          cycle: item.cycle,
          rate: item.ServiceType.value,
          deadline: item.ServiceType.maturity,
          email: item.Account.email,
        };

        temp.push(account);
      });
    }
  } catch (err) {
    console.log(err);
  }
  return temp;
};

const job = new cron.CronJob({
  cronTime: "* 30 1 * * *",
  onTick: function () {
    try {
      listCustomers().then((list) => {
        const curDate = new Date();
        if (list.length > 0) {
          list.forEach(async (item) => {
            const serDay = new Date(item.createdAt);
            const diff = Math.floor(
              (curDate.getTime() - serDay.getTime()) / 2629800000
            );
            if (diff > item.cycle && diff < item.deadline) {
              const total = item.balance * (1 + item.rate / 100 / 12);

              const account = await Services.findByPk(item.id);

              account.cycle += 1;
              account.balance = Math.round(total * 100) / 100;

              await account.save();

              const mailOptions = {
                from: process.env.USER_EMAIL,
                to: item.email,
                subject: "Thông Báo Lãi Xuất Tiết kiệm",
                text: `Lãi xuất tiết kiệm hàng tháng của bạn đã được tính:
                  Lãi xuất: ${Math.round(total * 100) / 100},
                  Tổng tiền vốn: ${account.balance}
                `,
              };

              Send(mailOptions);
            }

            if (diff > item.cycle && diff === item.deadline) {
              const total = item.balance * (1 + item.rate / 100 / 12);

              const account = await Services.findOne({
                where: {
                  accountId: item.accountId,
                  serviceType: {
                    [Op.ne]: 0,
                  },
                },
              });

              if(account){
                account.cycle = 0;
                account.balance = Math.round(total * 100) / 100;
                account.maturity = null;
  
                await account.save();  
              }
            
              const mainAccount = await Services.findOne({
                where: {
                  accountId: item.accountId,
                  serviceType: {
                    [Op.eq]: 0,
                  },
                },
              });

              if (mainAccount) {
                if(mainAccount.currencyUnitId === 1){
                  mainAccount.balance += account.balance;
                }else{
                  mainAccount.balance += account.balance * 23,090.00;
                }

                await mainAccount.save();

                const mailOptions = {
                  from: process.env.USER_EMAIL,
                  to: item.email,
                  subject: "Thông Báo",
                  text: `Tài khoản tiết kiệm hàng tháng của bạn đã đáo hạn và được tính lãi xuất đợt cuối của kì hạn ${
                    item.deadline
                  } tháng:
                  Lãi xuất: ${Math.round(total * 100) / 100},
                  Tổng tiền vốn tiết kiệm: ${account.balance},
                  Tiền tài khoản chính: ${mainAccount.balance}
                `,
                };
                Send(mailOptions);
              }
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  start: true,
  timeZone: "Asia/Ho_Chi_Minh",
});

job.start();
