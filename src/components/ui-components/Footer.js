import React, { Component } from 'react';
export default class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: window.location.href,

        }
    }
    render() {
        // console.log(document.documentElement.clientHeight, document.body.scrollHeight)
        // if (document.documentElement.clientHeight < document.body.scrollHeight) {
        //     return (
        //         <div>
        //             <footer className="navbar-fixed-bottom blog-footer fixed-bottom">

        //                 <p>Blog template built for <a href="https://getbootstrap.com/">Bootstrap</a> by <a href="https://twitter.com/mdo">@mdo</a>.</p>
        //                 <p>
        //                     <a href="" className='text-primary' onClick={() => { document.documentElement.scrollTop = 0 }}>Back to top</a>
        //                 </p>
        //             </footer>
        //         </div>

        //     );
        // }
        return (
            <div>
                <div style={{ "height": "150px" }}></div>
                <footer className="navbar-fixed-bottom blog-footer fixed-bottom">

                    <p>Hsin's protfolio by <a href="mailto:jdfcitecky@gmail.com">jdfcitecky@gmail.com</a>.</p>
                    <p>
                        <a href="" className='text-primary' onClick={() => { document.documentElement.scrollTop = 0 }}>Back to top</a>
                    </p>
                </footer>
            </div>

        );
    }
}