import slide001 from "../static/slide-001.jpg"
import slide002 from "../static/slide-002.jpg"
import slide003 from "../static/slide-003.jpg"

import Carousel from 'react-bootstrap/Carousel'

const Home = () => {
    return (
        <div className="row" >
            <Carousel variant="dark">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={slide001}
                        alt="First Slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={slide002}
                        alt="Second Slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={slide003}
                        alt="Third Slide"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default Home;