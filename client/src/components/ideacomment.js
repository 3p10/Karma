import { Col, Container, Row } from "react-bootstrap";
import { Route } from "react-router-dom";
import TextBlockForm from "./textblockform";



function IdeaComment(){





    return(

        <section>
            <Container className="mt-5 mx-4">

<Row>

<Col>

   Add Comments:
</Col>

</Row>


<Row>

<Col>

<TextBlockForm />
</Col>

</Row>


            </Container>
     
        </section>
    )

}


export default IdeaComment;


