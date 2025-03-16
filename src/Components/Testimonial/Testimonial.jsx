import React from 'react';
import { LuStar } from 'react-icons/lu';
// import testimonials from '../../../public/tesimonials.json';
import MichaelReyes from '../../assets/testimonials/Michael reyes US.webp';
import YoMagix from '../../assets/testimonials/Yo Magix.webp';
import marcusWilson from '../../assets/testimonials/marcus wilson.jpg';
import danielParedes from '../../assets/testimonials/daniel paredes.jpg';
import davidMartinez from '../../assets/testimonials/david martinez.webp';
import GérardMoreau from '../../assets/testimonials/Gérard Moreau.jpg';

const Testimonial = () => {
    const tesimonials = [
        {
            "id": 1,
            "name": "Michael Reyes",
            "country": "🇺🇸",
            "rating": 5,
            "image": MichaelReyes,
            "testimonial": "I always worried about my beats being stolen. Now, I have peace of mind knowing my work is legally registered and protected. This platform is a game-changer for producers!"
        },
        {
            "id": 2,
            "name": "Jason T YoMagix",
            "country": "🇺🇸",
            "rating": 4,
            "image": YoMagix,
            "testimonial": "I uploaded my beats to YouTube, and suddenly, I found artists using them without permission. Thanks to BeatProtect, I had proof of ownership and was able to take action."
        },
        {
            "id": 3,
            "name": "Marcus Wilson",
            "country": "🇬🇧",
            "rating": 5,
            "image": marcusWilson,
            "testimonial": "BeatProtect gives me confidence every time I upload a new beat. The registration process is easy, and I love knowing that if someone tries to steal my work, I have legal proof to back me up."
        },
        {
            "id": 4,
            "name": "Daniel Paredes",
            "country": "🇦🇷",
            "rating": 5,
            "image": danielParedes,
            "testimonial": "I never thought I needed something like BeatProtect until I saw one of my beats on a song I never authorized. Thanks to this platform, I was able to prove my rights and protect my music career!"
        },
        {
            "id": 5,
            "name": "David Martinez",
            "country": "🇲🇽",
            "rating": 5,
            "image": davidMartinez,
            "testimonial": "Durante años, me sentí impotente ante los artistas que usaban mis beats sin pagar. Ahora, con BeatProtect, puedo registrar mis beats al instante y asegurarme de recibir el crédito (y el pago) que merezco."
        },
        {
            "id": 6,
            "name": "Gérard Moreau",
            "country": "🇫🇷",
            "rating": 5,
            "image": GérardMoreau,
            "testimonial": "BeatProtect makes it easy to secure my beats. I don’t have to worry about complicated legal processes—I just upload my track, and I get my registration certificate. Simple, fast, and effective!"
        }
    ]
    return (
        <div>
            <section className="container mx-auto py-10 lg:py-24">
                <div className="text-center mb-8 lg:mb-16">
                    <h2 className="text-3xl md:text-6xl font-bold text-white mb-4">
                        Trusted by Producers <span className="text-[#7C3AED]">Worldwide</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Join thousands of music producers who trust BeatProtect to secure their creative work
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tesimonials.map((testimonial, index) => (
                        <div key={index} className="relative group">
                            <div className="absolute -inset-1 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                            <div className="relative bg-black/40 backdrop-blur-sm rounded-xl p-4 xl:p-8 border border-gray-800 hover:border-[#7C3AED]/50 transition duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <img
                                        src={testimonial.image}
                                        alt="Producer Avatar"

                                        className="h-20 w-20 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">{testimonial.name} {testimonial.country}</h3>
                                        <div className="flex items-center gap-1 text-[#7C3AED]">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <LuStar key={i} className="w-4 h-4 fill-current" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-400">&quot;{testimonial.testimonial}&quot;</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Testimonial;
