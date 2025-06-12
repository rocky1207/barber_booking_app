const ServiceItem:React.FC = () => {
    const services = [{id: '1', name: 'Šišanje', price: '1400'}, {id: '2', name: 'Stilizovanje brade', price: '800'},{id: '3', name: 'Pranje kose', price: '400'},{id: '4', name: 'Farbanje kose', price: '800'}];
    return (
        <>
        {services.map((service, index) => {
            return (
            <li key={service.id} style={{ animationDelay: `${index * 0.2}s` }}>
                <p>{service.name}: <span>{service.price}din.</span></p>
            </li>
            )
        })}
            
        </>
    );
};
export default ServiceItem;