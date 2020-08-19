import React, { Component } from 'react'

export default class Rates extends Component {
    constructor(props){
        super(props);

        this.state = {
            listOfRates: []
        }
    }

    fetchRates = async () => {
         const url = "http://localhost:8080/getRates";
         const fetchOpts = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
         };

         await fetch(url, fetchOpts)
         .then(async (response) => {
             await response.json()
             .then(result => {
                 this.setState({
                     listOfRates: result.data
                 }, () => {
                     //Do something
                    
                 })
             })
             .catch(err => {
                 console.error(err);
             })
         })
         .catch((err) => {
            console.error(err);
         });
    }

    componentDidMount() {
        setTimeout(() => {
            this.fetchRates();
        }, 50)
    }

    render() {
        var i = 1;
        return (
            <div style={{backgroundColor: "#fafafa", marginTop: "200px"}}>
                <h1>LÃI SUẤT TIẾT KIỆM</h1>
                <table className="table" style={{marginTop: "40px"}}>
                    <thead style={{backgroundColor: "gray"}}>
                        <tr>
                            <th scope="col" style={{border: "1px solid black"}}>#</th>
                            <th scope="col" style={{border: "1px solid black"}}>Loại</th>
                            <th scope="col" style={{border: "1px solid black"}}>Kì hạn</th>
                            <th scope="col" style={{border: "1px solid black"}}>Lãi suất</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.listOfRates?
                        this.state.listOfRates.map((element) => {
                            return(
                                <tr key={element.id}>
                                    <th style={{border: "1px solid black"}} scope="row">{i++}</th>
                                    <td style={{border: "1px solid black"}}>{element.name}</td>
                                    <td style={{border: "1px solid black"}}>{element.maturity} tháng</td>
                                    <td style={{border: "1px solid black"}}>{element.value}%</td>
                                </tr>
                            )
                        }):<div>Nothing</div>
                    }
                    </tbody>
                </table>
                <p>Hãy đến ngân hàng chúng tôi ngay, còn đợi chờ gì... lãi suất quá hấp dẫn</p>
            </div>
        )
    }
}
