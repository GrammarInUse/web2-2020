import React, { Component } from 'react'

export default class Intros extends Component {
    render() {
        return (
            <section id="intro">
                <div className="intro-container">
                    <div id="introCarousel" className="carousel  slide carousel-fade" data-ride="carousel">
                        <ol className="carousel-indicators" />
                        <div className="carousel-inner" role="listbox">
                            <div className="carousel-item active">
                                <div className="carousel-background"><img src="img/intro-carousel/1.jpg" alt="" /></div>
                                <div className="carousel-container">
                                <div className="carousel-content">
                                    <h2>We keep money for you 😘</h2>
                                    <p>The Largest Bank System In The World.</p>
                                    <a href="#featured-services" className="btn-get-started scrollto">Get Started</a>
                                </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="carousel-background"><img src="img/intro-carousel/2.jpg" alt="" /></div>
                                <div className="carousel-container">
                                <div className="carousel-content">
                                    <h2>We keep money for you 😘</h2>
                                    <p>The Largest Bank System In The World.</p>
                                    <a href="#featured-services" className="btn-get-started scrollto">Get Started</a>
                                </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="carousel-background"><img src="img/intro-carousel/3.jpg" alt="" /></div>
                                <div className="carousel-container">
                                <div className="carousel-content">
                                    <h2>We keep money for you 😘</h2>
                                    <p>The Largest Bank System In The World.</p>
                                    <a href="#featured-services" className="btn-get-started scrollto">Get Started</a>
                                </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="carousel-background"><img src="img/intro-carousel/4.jpg" alt="" /></div>
                                <div className="carousel-container">
                                <div className="carousel-content">
                                    <h2>We keep money for you 😘</h2>
                                    <p>The Largest Bank System In The World.</p>
                                    <a href="#featured-services" className="btn-get-started scrollto">Get Started</a>
                                </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="carousel-background"><img src="img/intro-carousel/5.jpg" alt="" /></div>
                                <div className="carousel-container">
                                <div className="carousel-content">
                                    <h2>We keep money for you 😘</h2>
                                    <p>The Largest Bank System In The World.</p>
                                    <a href="#featured-services" className="btn-get-started scrollto">Get Started</a>
                                </div>
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#introCarousel" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon ion-chevron-left" aria-hidden="true" />
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#introCarousel" role="button" data-slide="next">
                            <span className="carousel-control-next-icon ion-chevron-right" aria-hidden="true" />
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </section>
        )
    }
}
