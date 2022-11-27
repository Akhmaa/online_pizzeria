import React from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = React.useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();
    const { id } = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get('https://634292c6ba4478d4783de561.mockapi.io/pizzas/' + id);
                setPizza(data);

            } catch (error) {
                alert('Ошбка при получкении пиццы!');
                navigate('/')
            }
        }

        fetchPizza();
    }, []);

    if (!pizza) {
        return <>Загрузка...</>
    }
    return (
        <div className="container">
            <img src={pizza.imageUrl} />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₽</h4>
            <Link to={'/'}>
                <button
                    className="button button--outline button--add">
                    <span>Назад</span>
                </button>
            </Link>

        </div>
    )
}

export default FullPizza;