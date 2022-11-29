import React, { Component } from 'react';
import { Book, Edit3, Dribbble, Briefcase, Feather, Award, BookOpen } from 'react-feather';
import "./Timeline.css"
export default class Card extends Component {

    constructor(props) {
        super(props)

    }

    scrollToYear = (year) => {
        let target = document.querySelector(`#card-${year}-first`)
        if (target != null && target != undefined) {
            target.scrollIntoView({ behavior: "smooth" })
        }
    }



    render() {
        return (
            <div>
                <div className='timeline-float-scroll-nav'>
                    <div className='timeline-float-scroll-nav-btm btm-head' onClick={() => { this.scrollToYear(2016) }}>2016</div>
                    <div className='timeline-float-scroll-nav-btm' onClick={() => { this.scrollToYear(2017) }}>2017</div>
                    <div className='timeline-float-scroll-nav-btm' onClick={() => { this.scrollToYear(2018) }}>2018</div>
                    <div className='timeline-float-scroll-nav-btm' onClick={() => { this.scrollToYear(2019) }}>2019</div>
                    <div className='timeline-float-scroll-nav-btm' onClick={() => { this.scrollToYear(2020) }}>2020</div>
                    <div className='timeline-float-scroll-nav-btm' onClick={() => { this.scrollToYear(2021) }}>2021</div>
                    <div className='timeline-float-scroll-nav-btm' onClick={() => { this.scrollToYear(2022) }}>2022</div>
                </div>


                <div className="fadeIn">
                    <section id={"timeline"}>
                        <h1>Timeline</h1>
                        <div className="">
                            <p className="leader px-5 mx-5">The timeline below shows my studies, work, projects, etc. after high school graduation. All of these experiences made me want to improve the lives of all people through information technology, and these experiences also gave me both design thinking and technical ability to make every ideal possible from requirement discovery to product delivery.</p>
                        </div>
                        <div id="card-2016-first" className="demo-card-wrapper fadeIn first">
                            <div className="demo-card demo-card--step1">
                                <div className="head">
                                    <div className="number-box">
                                        <Book className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2016</span>Graduation</h2>
                                </div>
                                <div className="body">
                                    <p>In the summer of 2016, I graduated from Taipei City Jianguo High School. During my studies, I had outstanding performance in the field of art and literature, and also maintained stable results in other fields. Finally graduated with grades in about the top ten percent.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-1.png`} alt="Graphic" />
                                </div>
                            </div>

                            <div className="demo-card demo-card--step1 fadeIn second">
                                <div className="head">
                                    <div className="number-box">
                                        <Book className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2016</span>Admission</h2>
                                </div>
                                <div className="body">
                                    <p>After the winter university entrance examination, because National Taiwan University of Science and Technology has a better geographical location and a more free learning atmosphere, I chose National Taiwan University of Science and Technology to study.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-2.png`} alt="Graphic" />
                                </div>
                            </div>

                            <div className="demo-card demo-card--step2 fadeIn third">
                                <div className="head">
                                    <div className="number-box">
                                        <Edit3 className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2016</span>Design Work</h2>
                                </div>
                                <div className="body">
                                    <p>Most of the courses in the architecture department are taught around the design class. After experiencing the first copying job for practicing AutoCAD use and model making, we started the first design of the temporary shelter.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-arch-1.png`} alt="Graphic" />
                                </div>
                            </div>

                            <div className="demo-card demo-card--step2 fadeIn four">
                                <div className="head">
                                    <div className="number-box">
                                        <Edit3 className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2016</span>Design Work</h2>
                                </div>
                                <div className="body">
                                    <p>In the last work we have tried to consider the user's living habits. In this work, we have to add the analysis of the environment to design. It was also in this work that I first learned to use PhotoShop to edit pictures and arrange posters.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-arch-2.png`} alt="Graphic" />
                                </div>
                            </div>

                            <div id="card-2017-first" className="demo-card demo-card--step2 fadeIn fifth">
                                <div className="head">
                                    <div className="number-box">
                                        <Edit3 className="fea-ther-timeline" />
                                    </div>
                                    <h2><span className="small">2017</span>Design Work</h2>
                                </div>
                                <div className="body">
                                    <p>After failing to participate in the 2016 Decor House Awarad for my previous work, I focused on improving the quality of graphics and design methods. Therefore, in this work, I use Vray and PS for virtual-real integrated rendering and emphasize a more logical design method.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-arch-3.png`} alt="Graphic" />
                                </div>
                            </div>

                            <div className="demo-card demo-card--step2 fadeIn sixth">
                                <div className="head">
                                    <div className="number-box">
                                        <Edit3 className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2017</span>Design Work</h2>
                                </div>
                                <div className="body">
                                    <p>The last work received quite good feedback, but I did not stop pursuing the quality of the graphics. Therefore, I used proxy rendering in this work to increase the richness of the environment. In addition, I also used a lot of surface design and 3D printing to make models for the first time.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-arch-4.png`} alt="Graphic" />
                                </div>
                            </div>

                            <div className="demo-card demo-card--step2 fadeIn seventh">
                                <div className="head">
                                    <div className="number-box">
                                        <Edit3 className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2017</span>Design Work</h2>
                                </div>
                                <div className="body">
                                    <p>After using 3D printing to make the model, I have more time to modify the design and graphics. In the last work of the freshman year, I put forward a fairly complete design plan for users and the environment, and presented very high-quality graphics and openable models. This is also the first time I have achieved the first grade.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-arch-5.png`} alt="Graphic" />
                                </div>
                            </div>

                            <div className="demo-card demo-card--step2 fadeIn eighth">
                                <div className="head">
                                    <div className="number-box">
                                        <Edit3 className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2017</span>Design Work</h2>
                                </div>
                                <div className="body">
                                    <p>With the design experience in the first year of university, I think that I must adopt a more automated and data-dependent modeling method to show my design thinking, so I learned a lot of Rhino and Grasshopper technology during the summer vacation and made my first work in the second year of university put into use.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-arch-6.png`} alt="Graphic" />
                                </div>
                            </div>

                            <div className="demo-card demo-card--step3 fadeIn ninth">
                                <div className="head">
                                    <div className="number-box">
                                        <Dribbble className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2017</span>Activity</h2>
                                </div>
                                <div className="body">
                                    <p>After having a more comprehensive modeling ability, I started to participate in various activities to focus on various issues and exercise design thinking. The first activity is to provide renovation solutions for the old communities in Taipei. This activity also allowed me to gain experience in collective housing and community environment design one year in advance.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-acti-1.png`} alt="Graphic" />
                                </div>
                            </div>

                            <div className="demo-card demo-card--step2 fadeIn tenth">
                                <div className="head">
                                    <div className="number-box">
                                        <Edit3 className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2017</span>Design Work</h2>
                                </div>
                                <div className="body">
                                    <p>In the last design work in 2017, with my proficient modeling technology and analysis ability, I designed a library under the park. This library not only meets the needs of the community for green space, but also uses the original underground parking lot. This design also allowed me to win the first place for the second time.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-arch-7.png`} alt="Graphic" />
                                </div>
                            </div>

                            <div id="card-2018-first" className="demo-card demo-card--step5 fadeIn eleventh">
                                <div className="head">
                                    <div className="number-box">
                                        <Award className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2018</span>Award</h2>
                                </div>
                                <div className="body">
                                    <p>A year later, I participated in the 2017 Decor House Awarad again. This time I combine modern ideas with traditional architectural forms, and use realistic renderings and logical design explanations. This time I won the preferred award.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-award-dec-1.png`} alt="Graphic" />
                                </div>
                            </div>
                            <div className="demo-card demo-card--step2 fadeIn twelveth">
                                <div className="head">
                                    <div className="number-box">
                                        <Briefcase className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2018</span>Design Work</h2>
                                </div>
                                <div className="body">
                                    <p>In addition to training design thinking and software skills, I also learned about environmental control and building materials. In this work, I used Revit for thermal environment analysis and modeling to demonstrate the ability to apply building information models.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-arch-8.png`} alt="Graphic" />
                                </div>
                            </div>
                            <div className="demo-card demo-card--step4 fadeIn threeteenth">
                                <div className="head">
                                    <div className="number-box">
                                        <Briefcase className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2018</span>Work Experience</h2>
                                </div>
                                <div className="body">
                                    <p>When I was in high school, I participated in the architectural design experience course offered by the school. In 2018, I was asked by the teacher of this course to return to high school to give lectures. I added more analytical logic teaching to the courses that focused on creativity, so that more students can use analytical methods to solve practical problems.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline//tl-work-1.png`} alt="Graphic" />
                                </div>
                            </div>

                            <div className="demo-card demo-card--step2 fadeIn fourteenth">
                                <div className="head">
                                    <div className="number-box">
                                        <Edit3 className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2018</span>Design Work</h2>
                                </div>
                                <div className="body">
                                    <p>After nearly two years of professional training in architecture, I have established my own design workflow. In this work, in addition to completing the exhibition site that integrates local culture and vision, I also completed the design of the external environment, which is enough to demonstrate my extraordinary work ability.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-arch-9.png`} alt="Graphic" />
                                </div>
                            </div>

                            <div className="demo-card demo-card--step3 fadeIn fifteenth">
                                <div className="head">
                                    <div className="number-box">
                                        <Dribbble className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2018</span>Activity</h2>
                                </div>
                                <div className="body">
                                    <p>With the accumulation of design experience, I gradually noticed the problems in the traditional construction industry. So I turned my attention to how to use programming language to manipulate data to generate models. In this summer work camp, we use these software to simulate the complete assembly process of a structure and actually build it.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-acti-2.png`} alt="Graphic" />
                                </div>
                            </div>

                            <div className="demo-card demo-card--step4 fadeIn sixteenth">
                                <div className="head">
                                    <div className="number-box">
                                        <Briefcase className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2018</span>Work Experience</h2>
                                </div>
                                <div className="body">
                                    <p>In order to further understand the actual situation of the construction industry, I came to a lecturer's architect firm for an internship. During the internship, I participated in the design of several library spaces and assisted in communicating with customers. Although the results of the work were quite satisfactory to the supervisor, the work did not satisfy me.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline//tl-work-2.png`} alt="Graphic" />
                                </div>
                            </div>

                            <div className="demo-card demo-card--step2 fadeIn seventeenth">
                                <div className="head">
                                    <div className="number-box">
                                        <Edit3 className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2018</span>Design Work</h2>
                                </div>
                                <div className="body">
                                    <p>I also often use what I have learned in the structure course to design. In this work, I used shell structure, membrane structure and cable structure to show a compact and light appearance in a small base.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-arch-10.png`} alt="Graphic" />
                                </div>
                            </div>
                            <div className="demo-card demo-card--step5 fadeIn eighteenth">
                                <div className="head">
                                    <div className="number-box">
                                        <Award className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2018</span>Award</h2>
                                </div>
                                <div className="body">
                                    <p>After the third year of college, I was no longer satisfied with doing design assignments in the school classroom. I try to participate in various local and international competitions to exercise my design ability. In this tree house competition held in Taichung City, besides getting an honorable mention, I also learned how to make a budget.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-arch-ex-6.png`} alt="Graphic" />
                                </div>
                            </div>

                            <div className="demo-card demo-card--step5 fadeIn nineteenth">
                                <div className="head">
                                    <div className="number-box">
                                        <Award className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2018</span>Award</h2>
                                </div>
                                <div className="body">
                                    <p>After completing the tree house design competition, I immediately participated in the competition for the Tainan Riverside Exhibition Hall. In this competition, although I came up with a fairly complete design, in the end I only won a good one. Such a result gave me a good understanding of the dark side of the design industry.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-arch-ex-7.png`} alt="Graphic" />
                                </div>
                            </div>
                            <div className="demo-card demo-card--step5 fadeIn twentyth">
                                <div className="head">
                                    <div className="number-box">
                                        <Award className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2018</span>Award</h2>
                                </div>
                                <div className="body">
                                    <p>In addition to design based on real site, I prefer to do conceptual designs. I have realized that the development of information technology will change the way of life of human beings, so I put forward corresponding solutions for shared space and flexible space. Finally, it won two awards of the 2018 Architecture Master Prize for architecture and landscape living space.</p>
                                    <a className="timeline-card-link" target="_blank" href={`http://${process.env.REACT_APP_API_ADDRESS}/static/documents/am-1.png`}><div className='timeline-card-link-div'></div></a>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-arch-ex-1.png`} alt="Graphic" />
                                </div>
                            </div>
                            <div className="demo-card demo-card--step2 fadeIn twentyoneth">
                                <div className="head">
                                    <div className="number-box">
                                        <Edit3 className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2018</span>Design Work</h2>
                                </div>
                                <div className="body">
                                    <p>After I focused on the competition, the university design assignments became routine instead. I can always analyze the environment and user needs very quickly and give corresponding solutions. But I am still very grateful to the partners who worked with me in this assignment, and perhaps such a relationship is more important than any award.</p>
                                    <a className="timeline-card-hidden-link" target="_blank" href={`http://${process.env.REACT_APP_API_ADDRESS}/static/one/YAMINGANDCHOHSIN.jpg`}><div className='timeline-card-hidden-link-div'></div></a>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-arch-11.png`} alt="Graphic" />

                                </div>
                            </div>

                            <div id="card-2019-first" className="demo-card demo-card--step5 fadeIn twentytwoth">
                                <div className="head">
                                    <div className="number-box">
                                        <Award className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2019</span>Award</h2>
                                </div>
                                <div className="body">
                                    <p>Although the Tainan Riverside Exhibition Hall competition made me quite worried about the design industry, this work still won the honorary nomination of the 2018 Decor House Awarad for its fairly complete planning and realistic rendering.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-award-dec-2.png`} alt="Graphic" />
                                </div>
                            </div>

                            <div className="demo-card demo-card--step5 fadeIn twentythreeth">
                                <div className="head">
                                    <div className="number-box">
                                        <Award className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2019</span>Award</h2>
                                </div>
                                <div className="body">
                                    <p>In order to get more awards, I also packaged the homework in the usual courses. I add background issues to these assignments and make more detailed construction and use case diagrams. This also made the two refuge houses originally designed for the architectural structure class win the 2019 International Design Award Gold Award and Silver Award a total of 5 awards.</p>
                                    <a className="timeline-card-link" target="_blank" href={`http://${process.env.REACT_APP_API_ADDRESS}/static/documents/ida-gold-2.png`}><div className='timeline-card-link-div'></div></a>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-arch-ex-3.png`} alt="Graphic" />
                                </div>
                            </div>
                            <div className="demo-card demo-card--step5 fadeIn twentyfourth">
                                <div className="head">
                                    <div className="number-box">
                                        <Award className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2019</span>Award</h2>
                                </div>
                                <div className="body">
                                    <p>In order to get more awards, I also packaged the homework in the usual courses. I add background issues to these assignments and make more detailed construction and use case diagrams. This also made the two refuge houses originally designed for the architectural structure class win the 2019 International Design Award Gold Award and Silver Award a total of 5 awards.</p>
                                    <a className="timeline-card-link" target="_blank" href={`http://${process.env.REACT_APP_API_ADDRESS}/static/documents/ida-gold-1.png`}><div className='timeline-card-link-div'></div></a>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-arch-ex-4.png`} alt="Graphic" />
                                </div>
                            </div>
                            <div className="demo-card demo-card--step8 fadeIn twentyfiveth">
                                <div className="head">
                                    <div className="number-box">
                                        <BookOpen className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2019</span>NTU CSIE Training</h2>
                                </div>
                                <div className="body">
                                    <p>Although I have won many international awards, creating in the field of design can no longer satisfy me. So I decided to come to the information system training course offered by National Taiwan University. The first course I took was Python Basics. In the final report of this course, I showed the application of Python language in architectural design.</p>
                                    <a className="timeline-card-link" target="_blank" href={`http://${process.env.REACT_APP_API_ADDRESS}/static/documents/ntu_pythonb.jpg`}><div className='timeline-card-link-div'></div></a>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/ntu_pybasic.png`} alt="Graphic" />
                                </div>
                            </div>
                            <div className="demo-card demo-card--step8 fadeIn twentysixth">
                                <div className="head">
                                    <div className="number-box">
                                        <BookOpen className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2019</span>NTU CSIE Training</h2>
                                </div>
                                <div className="body">
                                    <p>In order to fully understand information engineering related knowledge from the basics, besides Python, I learned C and C++ languages. Through this course, in addition to understanding the basics and methods of C and C++, I also have a better understanding of memory operations and input and output.</p>
                                    <a className="timeline-card-link" target="_blank" href={`http://${process.env.REACT_APP_API_ADDRESS}/static/documents/ntu_c++b.jpg`}><div className='timeline-card-link-div'></div></a>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/ntu_c++b.png`} alt="Graphic" />
                                </div>
                            </div>
                            <div className="demo-card demo-card--step7 fadeIn twentyseventh">
                                <div className="head">
                                    <div className="number-box">
                                        <Edit3 className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2019</span>Certificate</h2>
                                </div>
                                <div className="body">
                                    <p>Studying in the information system training course at National Taiwan University is not only for acquiring comprehensive knowledge, but also for applying for a master's degree in computer science. In order to apply for this degree, I also took the TOEFl and GRE exams, and finally got a TOEFL mybest score of 93.</p>
                                    <a className="timeline-card-link" target="_blank" href={`http://${process.env.REACT_APP_API_ADDRESS}/static/documents/tl-toefl.jpg`}><div className='timeline-card-link-div'></div></a>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-toefl.png`} alt="Graphic" />
                                </div>
                            </div>

                            <div className="demo-card demo-card--step5 fadeIn twentyeighth">
                                <div className="head">
                                    <div className="number-box">
                                        <Award className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2019</span>Award</h2>
                                </div>
                                <div className="body">
                                    <p>In the fall of 2019, I won the 2019 Red Dot Design Award for my wooden structure house inspired by remote working life. At National Taiwan University of Science and Technology, it only takes a few international awards to earn a Master of Architecture degree. However, I already received more awards than this requirement in my senior year.</p>
                                    <a className="timeline-card-link" target="_blank" href={`http://${process.env.REACT_APP_API_ADDRESS}/static/documents/reddot.png`}><div className='timeline-card-link-div'></div></a>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-arch-ex-5.png`} alt="Graphic" />
                                </div>
                            </div>
                            <div id="card-2020-first" className="demo-card demo-card--step8 fadeIn twentyninth">
                                <div className="head">
                                    <div className="number-box">
                                        <BookOpen className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2020</span>NTU CSIE Training</h2>
                                </div>
                                <div className="body">
                                    <p>In addition to the basics of programming languages, I also studied algorithmic problem-solving courses because I deeply understand the importance of efficiency. In this course, I learned about the difference and use of data structures through the actual topics from Leetcode. And I also learned DFS, BFS, divide and conquer, 2pointer, dynamic programming and other algorithm concepts.</p>
                                    <a className="timeline-card-link" target="_blank" href={`http://${process.env.REACT_APP_API_ADDRESS}/static/documents/ntu_pythons.jpg`}><div className='timeline-card-link-div'></div></a>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/ntu_pythons.png`} alt="Graphic" />
                                </div>
                            </div>
                            <div className="demo-card demo-card--step8 fadeIn thirtyth">
                                <div className="head">
                                    <div className="number-box">
                                        <BookOpen className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2020</span>NTU CSIE Training</h2>
                                </div>
                                <div className="body">
                                    <p>The goal of learning information engineering-related knowledge and technologies is still to create actual products. So in order to learn how to obtain data and make web applications, I also took courses on Python Excel and line chatbot. In this course, I learned how to implement crawlers in different ways and save the data in excel, and then present the information to users through linebot.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/ntu_pyxl.png`} alt="Graphic" />
                                </div>
                            </div>
                            <div className="demo-card demo-card--step8 fadeIn thirtyoneth">
                                <div className="head">
                                    <div className="number-box">
                                        <BookOpen className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2020</span>NTU CSIE Training</h2>
                                </div>
                                <div className="body">
                                    <p>Using linebot and excel as the application interface and database gave me a preliminary concept of application programming, but I knew that I needed a more flexible development platform. So I chose to learn django. In this class, I learned about the use of MVC architecture, ORM and basic SQL.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/ntu_pydjango.png`} alt="Graphic" />
                                </div>
                            </div>
                            <div className="demo-card demo-card--step8 fadeIn thirtytwoth">
                                <div className="head">
                                    <div className="number-box">
                                        <BookOpen className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2020</span>NTU CSIE Training</h2>
                                </div>
                                <div className="body">
                                    <p>In addition to the more complex libraries like django, I also understand the trend of using lightweight architecture to develop microservices. So I also learned flask. In this class, I learned a lot of knowledge that an actual engineer must know, such as how to connect APIs, how to prevent CSRF attacks, what is CORS, and what is a restful method.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/ntu_pyflask.png`} alt="Graphic" />
                                </div>
                            </div>
                            <div className="demo-card demo-card--step8 fadeIn thirtythreeth">
                                <div className="head">
                                    <div className="number-box">
                                        <BookOpen className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2020</span>NTU CSIE Training</h2>
                                </div>
                                <div className="body">
                                    <p>Although I learned how to use Boostrap to beautify web pages in the flask course, I think it is more important to understand basic css, html and javascript knowledge. Therefore, in this course, in addition to various html tags, I also learned that through the combination of various css features, web page visual effects can be achieved with less code and higher performance.</p>
                                    <a className="timeline-card-link" target="_blank" href={`http://${process.env.REACT_APP_API_ADDRESS}/static/documents/ntu_htmlb.jpg`}><div className='timeline-card-link-div'></div></a>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/ntu_htmlb.png`} alt="Graphic" />
                                </div>
                            </div>
                            <div className="demo-card demo-card--step8 fadeIn thirtyfourth">
                                <div className="head">
                                    <div className="number-box">
                                        <BookOpen className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2020</span>NTU CSIE Training</h2>
                                </div>
                                <div className="body">
                                    <p>Understanding how to use css and html is only the first step in web design. In order to create a more complete application, I also studied Javascript courses. In this course, I learned how to use Javascript to select, add, and delete DOM elements, as well as the basic React framework. In addition, I also learn how to use canvas to create image editing applications and web games.</p>
                                    <a className="timeline-card-link" target="_blank" href={`http://${process.env.REACT_APP_API_ADDRESS}/static/documents/ntu_jsc.jpg`}><div className='timeline-card-link-div'></div></a>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/ntu_jscanvasb.png`} alt="Graphic" />
                                </div>
                            </div>
                            <div className="demo-card demo-card--step8 fadeIn thirtyfiveth">
                                <div className="head">
                                    <div className="number-box">
                                        <BookOpen className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2020</span>NTU CSIE Training</h2>
                                </div>
                                <div className="body">
                                    <p>Understanding how to use css and html is only the first step in web design. In order to create a more complete application, I also studied Javascript courses. In this course, I learned how to use Javascript to select, add, and delete DOM elements, as well as the basic React framework. In addition, I also learn how to use canvas to create image editing applications and web games.</p>
                                    <a className="timeline-card-link" target="_blank" href={`http://${process.env.REACT_APP_API_ADDRESS}/static/documents/ntu_jsc.jpg`}><div className='timeline-card-link-div'></div></a>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/ntu_jscanvasg.png`} alt="Graphic" />
                                </div>
                            </div>
                            <div className="demo-card demo-card--step8 fadeIn thirtysixth">
                                <div className="head">
                                    <div className="number-box">
                                        <BookOpen className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2020</span>NTU CSIE Training</h2>
                                </div>
                                <div className="body">
                                    <p>For me, the best way to learn is to practice repeatedly, so after half a year, I took the problem-solving course again. In this advanced course, in addition to reviewing the basic problem-solving methods, I also learned more about graph theory problem-solving methods.</p>
                                    <a className="timeline-card-link" target="_blank" href={`http://${process.env.REACT_APP_API_ADDRESS}/static/documents/ntu_pythonsadv.jpg`}><div className='timeline-card-link-div'></div></a>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/ntu_pythonsadv.png`} alt="Graphic" />
                                </div>
                            </div>
                            <div className="demo-card demo-card--step8 fadeIn thirtyseventh">
                                <div className="head">
                                    <div className="number-box">
                                        <BookOpen className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2020</span>NTU CSIE Training</h2>
                                </div>
                                <div className="body">
                                    <p>In the problem-solving course, I learned the importance of data structure. Due to the different ways of implementing data structures in different languages, I also took advanced programming language courses. These courses let me understand the different methods and logics used by different languages to implement the same data structure or feature.</p>
                                    <a className="timeline-card-link" target="_blank" href={`http://${process.env.REACT_APP_API_ADDRESS}/static/documents/ntu_pythonadv.jpg`}><div className='timeline-card-link-div'></div></a>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/ntu_pythonadv.png`} alt="Graphic" />
                                </div>
                            </div>
                            <div className="demo-card demo-card--step8 fadeIn thirtyeightth">
                                <div className="head">
                                    <div className="number-box">
                                        <BookOpen className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2020</span>NTU CSIE Training</h2>
                                </div>
                                <div className="body">
                                    <p>Even though I aimed my learning at making web applications, I know that data processing and data science are quite common applications as well. In this course, I learned how to use Pytorch, pandas, matlib and other libraries.</p>
                                    <a className="timeline-card-link" target="_blank" href={`http://${process.env.REACT_APP_API_ADDRESS}/static/documents/ntu_mlb.jpg`}><div className='timeline-card-link-div'></div></a>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/ntu_mlb.png`} alt="Graphic" />
                                </div>
                            </div>
                            <div className="demo-card demo-card--step8 fadeIn thirtynineth">
                                <div className="head">
                                    <div className="number-box">
                                        <BookOpen className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2020</span>NTU CSIE Training</h2>
                                </div>
                                <div className="body">
                                    <p>After I learned a lot about front-end and back-end, I also learned the importance of maintenance. So I also took the linux course. In this course, we first understand what a virtual machine is, and then we learn how to install applications, read and write files, and check network status on linux and other basic operations.</p>
                                    <a className="timeline-card-link" target="_blank" href={`http://${process.env.REACT_APP_API_ADDRESS}/static/documents/ntu_linux.jpg`}><div className='timeline-card-link-div'></div></a>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/ntu_linux.png`} alt="Graphic" />
                                </div>
                            </div>

                            <div className="demo-card demo-card--step1 fadeIn fourtyth">
                                <div className="head">
                                    <div className="number-box">
                                        <Book className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2020</span>Graduation</h2>
                                </div>
                                <div className="body">
                                    <p>Although I optimized the time for making my graduation project to apply for graduate schools and study information technology, I still graduated from the Department of Architecture of National Taiwan University of Science and Technology with the first place. And I was also admitted to the Graduate School of Architecture Department of NTUST with the first place.</p>
                                    <a className="timeline-card-link" target="_blank" href={`http://${process.env.REACT_APP_API_ADDRESS}/static/documents/ntust_diploma.jpg`}><div className='timeline-card-link-div'></div></a>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-diploma-ntust.png`} alt="Graphic" />
                                </div>
                            </div>

                            <div className="demo-card demo-card--step1 fadeIn fourtyoneth">
                                <div className="head">
                                    <div className="number-box">
                                        <Book className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2020</span>Admission</h2>
                                </div>
                                <div className="body">
                                    <p>Applying to a graduate school abroad is a long process, and I received offers from the Computer Science Departments of the University of California, Davis, University of Pittsburgh, University at Buffalo, University of Texas at Dallas, and University of Illinois Chicago. Finally, I chose the highest-ranked University of California, Davis to study.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-ucdavislogo.png`} alt="Graphic" />
                                </div>
                            </div>

                            <div className="demo-card demo-card--step6 fadeIn fourtytwoth">
                                <div className="head">
                                    <div className="number-box">
                                        <Book className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2020</span>M.S Course</h2>
                                </div>
                                <div className="body">
                                    <p>The first class at UC Davis was Programming Language, which mainly discussed how the compiler debugs and optimizes according to the data flow of the program. In this class, we implemented a variety of data flow detection algorithms using C++ based on the paper. This also made me understand the importance of learning graph theory-related problem-solving methods in the past.</p>
                                    <a className="timeline-card-link" target="_blank" href={`http://${process.env.REACT_APP_API_ADDRESS}/static/documents/tl-transcript-ucdavis.jpg`}><div className='timeline-card-link-div'></div></a>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-transcript-ucdavis.png`} alt="Graphic" />
                                </div>
                            </div>

                            <div className="demo-card demo-card--step6 fadeIn fourtythreeth">
                                <div className="head">
                                    <div className="number-box">
                                        <Book className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2020</span>M.S Course</h2>
                                </div>
                                <div className="body">
                                    <p>Another class I took in my first semester at UC Davis was Distributed Database. This class mainly discuss the development of blockchain with papers and project implementation. In this class, we spent a lot of time understanding what bottlenecks and trade off for network-based applications and how to solve the Byzantine problem. In addition, we have also implemented a cross-chain trading website through Algorand's API.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/ms265.png`} alt="Graphic" />
                                </div>
                            </div>

                            <div id="card-2021-first" className="demo-card demo-card--step6 fadeIn fourtyfourth">
                                <div className="head">
                                    <div className="number-box">
                                        <Book className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2021</span>M.S Course</h2>
                                </div>
                                <div className="body">
                                    <p>In the winter quarter, I took a Computer Architecture class. This class mainly explains the cooperative relationship between CPU, register, cache and memory. By understanding the limitations and working methods of the hardware, it provides guidance for the development and optimization of software and system design.</p>
                                    <a className="timeline-card-link" target="_blank" href={`http://${process.env.REACT_APP_API_ADDRESS}/static/documents/tl-transcript-ucdavis.jpg`}><div className='timeline-card-link-div'></div></a>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-transcript-ucdavis.png`} alt="Graphic" />
                                </div>
                            </div>

                            <div className="demo-card demo-card--step6 fadeIn fourtyfiveth">
                                <div className="head">
                                    <div className="number-box">
                                        <Book className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2021</span>M.S Course</h2>
                                </div>
                                <div className="body">
                                    <p>In addition to the core course Computer Architecture, I also took the equally important course Operating System. In this course, we reviewed concepts such as memory management, program management, multithreading, and input and output. And we also implemented operating system for a RISCV CPU game console in the project.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/msos.png`} alt="Graphic" />
                                </div>
                            </div>
                            <div className="demo-card demo-card--step6 fadeIn fourtysixth">
                                <div className="head">
                                    <div className="number-box">
                                        <Book className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2021</span>M.S Course</h2>
                                </div>
                                <div className="body">
                                    <p>My original goal of learning information technology was to create web applications. So I also took Computer Network class. This class focuses on how to use a probability model to analyze the efficiency of various network protocols from the bottom line multiplexing to the time slot of the network layer and the top layer, especially explaining the design of TCP to ensure packet delivery, and let us understand the possibilities of various network applications Encountered performance bottlenecks.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/ms252.png`} alt="Graphic" />
                                </div>
                            </div>
                            <div className="demo-card demo-card--step6 fadeIn fourtyseventh">
                                <div className="head">
                                    <div className="number-box">
                                        <Book className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2021</span>M.S Course</h2>
                                </div>
                                <div className="body">
                                    <p>In the spring quarter, I also took the Thory of computation class. This class mainly discusses whether P is equal to NP. Since this class is more biased towards theoretical research, it did not inspire me much. The only thing I can say is that I fully understand that I am more suitable for work related to technology and products.</p>
                                    <a className="timeline-card-link" target="_blank" href={`http://${process.env.REACT_APP_API_ADDRESS}/static/documents/tl-transcript-ucdavis.jpg`}><div className='timeline-card-link-div'></div></a>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-transcript-ucdavis.png`} alt="Graphic" />
                                </div>
                            </div>
                            <div className="demo-card demo-card--step6 fadeIn fourtyeightth">
                                <div className="head">
                                    <div className="number-box">
                                        <Book className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2021</span>M.S Course</h2>
                                </div>
                                <div className="body">
                                    <p>Another class I took in the spring quarter was Algorithm. The goal of this class is mainly to hope that we can learn to optimize various algorithms. However, in fact, we still review the concepts of algorithm complexity, divide and conquer, DFS, BFS, dynamic programming, and the use of data structures.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/ms222a.png`} alt="Graphic" />
                                </div>
                            </div>
                            <div className="demo-card demo-card--step6 fadeIn fourtynineth">
                                <div className="head">
                                    <div className="number-box">
                                        <Book className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2021</span>M.S Course</h2>
                                </div>
                                <div className="body">
                                    <p>In the last quarter, I took a Scientific computation class. In this class, we will have to quickly understand many relatively rare microscopic physics knowledge, and simulate the behavior of these molecules or electrons on the remote server through various libraries. And write these experimental results into reports and compare them with actual physical experiments.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/ms289k.png`} alt="Graphic" />
                                </div>
                            </div>
                            <div className="demo-card demo-card--step6 fadeIn fiftyth">
                                <div className="head">
                                    <div className="number-box">
                                        <Book className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2021</span>M.S Course</h2>
                                </div>
                                <div className="body">
                                    <p>Another class I took in my final semester was Application of Linear Algebra. In this class, we first understand the errors or bottlenecks that the computer may cause when performing floating-point operations. Then we used C++ to implement various applications such as matrix decomposition, curve patch and image compression.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/ms230.png`} alt="Graphic" />
                                </div>
                            </div>


                            <div id="card-2022-first" className="demo-card demo-card--step1 fadeIn fiftyoneth">
                                <div className="head">
                                    <div className="number-box">
                                        <Book className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2022</span>Graduation</h2>
                                </div>
                                <div className="body">
                                    <p>As the fall quarter of 2021 comes to an end, I have completed all core and elective courses. I also gained a systematic understanding of the field of computer science. I then completed my master's degree exams and finally received a master's degree in computer science from UC Davis in the spring of 2022.</p>
                                    <a className="timeline-card-link" target="_blank" href={`http://${process.env.REACT_APP_API_ADDRESS}/static/documents/tl-diploma-ucdavis.jpg`}><div className='timeline-card-link-div'></div></a>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-diploma-ucdavis.png`} alt="Graphic" />
                                </div>
                            </div>

                            <div className="demo-card demo-card--step9 fadeIn fiftytwoth">
                                <div className="head">
                                    <div className="number-box">
                                        <Book className="feather-timeline" />
                                    </div>
                                    <h2><span className="small">2022</span>Side project</h2>
                                </div>
                                <div className="body">
                                    <p>In addition to the master's degree courses, I also learn more network application technologies on the udemy and hiskio platforms. To put these technologies into practice, I aimed to develop a fully functional personal website that supports instant messaging. In this project, I use the gin framework to cooperate with gorm and gorilla to complete the back-end service, and use react to write the front-end. Finally, it is deployed on AWS with Docker.</p>
                                    <img className="timeline-card-imageFit" src={`http://${process.env.REACT_APP_API_ADDRESS}/static/timeline/tl-sideproject-1.png`} alt="Graphic" />
                                </div>
                            </div>











                        </div>
                    </section >
                </div >
            </div>
        );
    }
}