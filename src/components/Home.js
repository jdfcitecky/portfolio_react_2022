import React, { Component } from 'react';
import Jumbotron from './ui-components/Jumbotron';
import Card from './ui-components/Card';
import Timeline from './ui-components/Timeline';
export default class Home extends Component {
    render() {
        return (
            <div>
                <div style={{ height: document.documentElement.clientHeight - 200 }} className='container fadeIn'>
                    <Jumbotron text='UC Davis CS Master, 2019 Red Dot Design Award winner, 3 years experience full stack developer. Creator with Design Thinking and Technology.' />
                    <div className='row mb-2'>
                        <Card color='primary' category='Backend' text='Using Go, Python, NodeJS and the corresponding framework to implement various API micro-services including instant messaging, membership system, mall system, database operation, file server, crawler, chat robot, etc., and deploy on AWS with Docker.' link='/search/backend' linkwords='See more' picture={`http://${process.env.REACT_APP_API_ADDRESS}/static/backup/js_web/js_web_1.png`} />
                        <Card color='success' category='Frontend' text='Using React to create a variety of interactive web pages that are easy to maintain and make good use of CSS to efficiently meet various design needs. Create web games and image processing apps using Javascript Canvas.' link='/search/frontend' linkwords='See more' picture={`http://${process.env.REACT_APP_API_ADDRESS}/static/backup/html_basic/html_basic_1.png`} />
                    </div>
                    <div className='row mb-2'>
                        <Card color='info' category='M.S Project' text='Projects completed during the CS Master class at UC Davis, including blockchain-based asset trading platform, RISCV-based game console operating system, Ethernet protocol simulation, scientific computing experimental simulation, linear algebra numerical method research, etc.' link='/search/m.s.%20project' linkwords='See more' picture={`http://${process.env.REACT_APP_API_ADDRESS}/static/backup/ms_265/ms_265_1.png`} />
                        <Card color='warning' category='Design' text='Through architectural design and product design projects, demonstrate the capabilities in project design and management, including research on user and environmental analysis, formulation of product functions and work plans, optimization and product cycle management.' link='/search/design' linkwords='See more' picture={`http://${process.env.REACT_APP_API_ADDRESS}/static/backup/arch_ex_7/arch_ex_7_1.png`} />
                    </div>

                </div>
            </div>
        );
    }
}
