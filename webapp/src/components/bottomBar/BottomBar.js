import { Navbar, Nav } from "react-bootstrap";

import icon from '../../images/icon.png';
import facebook from '../../images/facebook.svg';
import twitter from '../../images/twitter.svg';
import instagram from '../../images/instagram.svg';
import linkedin from '../../images/linkedin.svg';
import youtube  from '../../images/youtube.svg';

function BottomBar(){

    const socials = [{link:"https://www.facebook.com/Box-of-Hope-106011608167716", src:facebook},
                     {link:"https://twitter.com/theboxofhope",src:twitter},
                     {link:"https://www.instagram.com/theboxofhope", src:instagram},
                     {link:"https://www.linkedin.com/company/theboxofhope", src:linkedin},
                     {link:"https://www.youtube.com/channel/UCG8txVUxQb3aCut7adeDU7A", src:youtube}
                    ]

    return (<Navbar height="64px" bg="light" variant="light" sticky="bottom">
    <Navbar.Brand href="#home"><img height="48px" src={icon}></img></Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#notification">Notification</Nav.Link>
      <Nav.Link href="#masks">Masks</Nav.Link>
      <Nav.Link href="#stats">Stats</Nav.Link>
    </Nav>
    <Nav className="justify-content-end">
        {socials.map(social=>(<Nav.Link href={social.link}><img height="32px" src={social.src}></img></Nav.Link>))}
    </Nav>
  </Navbar>);

}

export default BottomBar;