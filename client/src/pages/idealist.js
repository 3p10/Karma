import React, { useState, useEffect, useMemo } from 'react';
import { Badge, Button, ButtonGroup, Card, Col, Image, Row } from 'react-bootstrap';
import { BiDislike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import LikeDislikeToggle from '../components/likedisliketoggle';
import Karma from '../components/karma';
import IdeaKarma from '../components/ideakarma';
import IdeaComponent from '../components/ideacomponent';
import { useMyContext } from '../context/MyContext';

const IdeaList = () => {

 const {homeUpdate,sethomeUpdate}=useMyContext()

    const [ideasWithFiles, setIdeasWithFiles] = useState([]);
    const [selectedIcon, setSelectedIcon] = useState(null);

    const [sort,setsort]=useState('latest')

const setSortOption=(option)=>{
    // alert(option)
    setsort(option)

}


    const handleIconClick = (icon) => {
        setSelectedIcon(icon);
    };
    // useEffect(() => {
    //     // Fetch data from the API when the component mounts
    //     fetch(`http://localhost:3000/api/ideas-with-files?sort=${sort}`) // Assuming the API is served from the same host
    //         .then(response => response.json())
    //         .then(data => {
    //             setIdeasWithFiles(data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //         });
    // }, []);


    useEffect(() => {
    // alert(sort)
        // Fetch data from the API when the component mounts?sort=${sort}
        fetch(`http://localhost:3000/api/ideas-with-files?sort=${sort}`) // Assuming the API is served from the same host
            .then(response => response.json())
            .then(data => {
               
                setIdeasWithFiles(data);
                console.log(data[0])
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [sort,homeUpdate]);

    return (
        <section className='bg-light py-3'>
            <div class="container mt-5">
<Row>
    <Col className='d-flex '>
    
    <Button variant='outline-secondary' className='me-2' onClick={()=>setSortOption('latest')}>Latest</Button>
    <Button variant='outline-secondary' className='me-2' onClick={()=>setSortOption('oldest')}>Oldest</Button>
    <Button variant='outline-secondary' className='me-2' onClick={()=>setSortOption('best')}>Best</Button>
    
    </Col>
</Row>

                {ideasWithFiles.map(idea => (
                    <IdeaComponent key={idea.id} idea={idea} />
                ))}

            </div>
        </section>
    );
};

export default IdeaList;