import React, { Component } from 'react';
import './CardWithPicture.css'
export default class CardWithPictures extends Component {

    constructor(props) {
        super(props)

    }
    render() {
        return (
            <div className="my-3 card col-md-12 fadeIn">
                <div className='row'>
                    <div className='col-8'>
                        <div className="card-body d-flex flex-column align-items-start">
                            <div class="d-flex flex-row">
                                <strong className={`d-inline-block mb-2 text-${this.props.color}`}>{this.props.category}</strong>
                                <span className="dot mx-2 my-2"></span><span className=" mr-2">{this.props.year}</span>
                            </div>
                            <h3 className="mb-0">
                                <p className="text-dark backup-card-title">{this.props.title}</p>
                            </h3>
                            <p className="backup-card-text">{this.props.text}</p>

                        </div>
                    </div>
                    <div className='col-4 backup-card-tools'>
                        <div className='d-flex flex-column'>
                            <div className="align-items-start">
                                {this.state.toolTags?.map((t) => (
                                    <span class="badge badge-info m-1 float-left">{t}</span>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
                <div className="card p-2 mb-4 box-shadow h-md-250 d-flex justify-content-between">
                    <div class="pt-4 d-flex justify-content-between">
                        <div className='backup-previewZone'><img src={this.props.pictureone} /></div>
                        <div className='backup-previewZone'><img src={this.props.picturetwo} /></div>
                        <div className='backup-previewZone'><img src={this.props.picturethree} /></div>
                        <div className='backup-previewZone'><img src={this.props.picturefour} /></div>
                        <div className='backup-previewZone'><img src={this.props.picturefive} /></div>
                    </div>

                </div>
            </div>

        );
    }
}