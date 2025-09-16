import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function CategoryDetailsPage() {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [opportunities, setOpportunities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const catRes = await axiosClient.get(`/categories/${id}`);
            setCategory(catRes.data);
            const oppRes = await axiosClient.get(`/opportunities?category_id=${id}`);
            setOpportunities(oppRes.data);
        };
        fetchData();
    }, [id]);

    if (!category) return <p>Loading...</p>;

    return (
        <div className="page-container">
            <h1>{category.name}</h1>
            <p>{category.description}</p>
            <Link to={`/categories/${id}/create-opportunity`}>➕ צור בקשה/הצעה</Link>
            <ul>
                {opportunities.map(o => (
                    <li key={o.id}>
                        <Link to={`/opportunities/${o.id}`}>{o.title}</Link> - {o.org_name}
                    </li>
                ))}
            </ul>
        </div>
    );
}