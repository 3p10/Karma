import { Badge, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { BiDislike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import LikeDislikeToggle from './likedisliketoggle';
import Karma from './karma';
import IdeaKarma from './ideakarma';
import { useState } from 'react';
import TextBlockForm from './textblockform';
import Blocklist from './blocklist';


function IdeaComponent({idea}){

    const [divVisible, setDivVisible] = useState(false);

    const toggleDivVisibility = () => {
        // alert(idea.id)
      setDivVisible(!divVisible);
    };
  


return(

<section>
<Card className='m-2 shadow-sm' >
                        <Card.Body>
                            <div >
                                <Row className='align-items-center p-1 '>
                                    <Col md={3} sm={12}>
                                        <Card.Img variant="top" style={{ maxHeight: "300px", maxWidth: "100%" }} src={"http://localhost:3000/" + idea.header_image_path} />
                                    </Col>
                                    <Col md={7} sm={12} className='content-aligh-center  p-2'>





                                        <Card.Title  ><a style={{ color: 'black',cursor:'pointer' }} 
                                        onClick={toggleDivVisibility}
                                        >{idea.title}</a></Card.Title>
                                        <Card.Text style={{ whiteSpace: 'pre-wrap' }}>{idea.description}</Card.Text>
                                    </Col>
                                    <Col md={2} sm={12} className='d-flex flex-column align-items-center '>
                                        <Image src={"http://localhost:3000/" + idea.userimage}
                                            roundedCircle style={{ maxHeight: "80px", maxWidth: "80px" }} />
                                        <Karma idea={idea} />

                                    </Col>
                                </Row>
                                <hr />
                                <Row   >


                                    <Col>

                                        <IdeaKarma idea={idea} />
                                    </Col>

                                    <Col>
                                        <LikeDislikeToggle idea={idea} />
                                    </Col>




                                </Row>

                                <hr />


                                {idea.files.length > 0 && (
                                    <ul>
                                        {idea.files.map(file => (
                                            <li key={file.id}>
                                                <a
                                                    href={`http://localhost:3000/download/${file.file_name}`} download={file.file_name}>

                                                    {/* href={file.file_path} */}
                                                    {file.file_name}



                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                    <div>

      




      {divVisible && <Container>
      <Row>

        <Col>
        <h4> Comments:</h4>
        <Blocklist ideaId={idea.id} idea={idea} />
        </Col>
      </Row>
      
      


      <Row>

<Col>
<TextBlockForm ticketId={idea.id} senderid={idea.senderid} />
</Col>

      </Row>
      
      </Container>}
    </div>
                        </Card.Body>
                    </Card>







                    </section>


)



}




export default IdeaComponent;