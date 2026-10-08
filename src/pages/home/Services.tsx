import { Coverage } from '../../components/Coverage';
import { SectionHead } from '../../components/SectionHead';
import { SERVICES } from '../../data/services';

export function Services() {
    return (
        <section id="services" className="section container">
            <SectionHead
                index="05"
                label="Services"
                title={
                    <>
                        What I can build <span className="serif">for you.</span>
                    </>
                }
                lede="Open to full-time roles and focused freelance work. These are the places I add the most value — and the layers each one touches."
            />

            <ul className="services">
                {SERVICES.map((service, index) => (
                    <li key={service.title} className="service">
                        <span className="service__index mono">{String(index + 1).padStart(2, '0')}</span>
                        <h3>{service.title}</h3>
                        <p>{service.detail}</p>
                        <Coverage layers={service.layers} size="sm" />
                    </li>
                ))}
            </ul>
        </section>
    );
}
