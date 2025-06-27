import React, { useRef, useState } from 'react';
import { IoIosLink } from "react-icons/io";

const SpanishTemplate = () => {

      const templateRef = useRef(null);
        const [showToast, setShowToast] = useState(false);
    
        const handleCopy = () => {
            const text = templateRef.current?.innerText;
            if (text) {
                navigator.clipboard.writeText(text).then(() => {
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 3000);
                }).catch(err => {
                    console.error(err);
                });
            }
        };



    return (
        <div className="min-h-screen bg-black flex flex-col items-center py-10 px-4 relative">
            {showToast && (
                <div className="fixed top-5 bg-purple-600 text-white px-4 py-2 rounded shadow-lg animate-bounce z-50">
                    ✅ Template Copied!
                </div>
            )}

            <h1 className="text-[#6e33cb] text-3xl font-bold mb-4">Message Template</h1>
            <p className="text-gray-300 text-center max-w-2xl mb-8">
                Use this professional template to contact artists using your beats without authorization
            </p>

            <div className="bg-[#1e1e1e] text-gray-300 max-w-2xl w-full rounded-2xl shadow-lg p-6">
                <div className="flex justify-end mb-4">
                    <button
                        onClick={handleCopy}
                        className="bg-[#6e33cb] text-white hover:bg-purple-700 px-4 py-2 rounded-lg"
                    >
                        Copy Template
                    </button>
                </div>

                <div ref={templateRef} className="bg-[#2b2b2b] p-6 rounded-lg whitespace-pre-wrap text-gray-200">
                    <p><strong>Asunto:</strong>  Urgente: Uso No Autorizado de Beat – Se Requiere Licencia</p>
                    <p className="mt-4">Hola [Nombre del Artista],</p>
                    <p className="mt-4">
                        Espero que estés bien. Recientemente descubrí que has utilizado mi beat titulado "[Nombre del
                        Beat]" en tu canción "[Nombre de la Canción]", la cual actualmente está disponible en
                        [Plataformas donde está publicada la canción].
                    </p>
                    <p className="mt-4">
                        Me alegra que mi producción haya inspirado tu creatividad y aprecio tu interés en mi trabajo.
                        Sin embargo, este beat está protegido por derechos de autor y su uso requiere una licencia
                        válida. Lamentablemente, no encontré ninguna licencia asociada a tu canción, lo que significa
                        que actualmente se está utilizando sin mi autorización.
                    </p>
                    <p className="mt-4">
                        Para que puedas seguir utilizando el beat de manera legal y evitar reclamaciones por derechos
                        de autor, te invito a adquirir la licencia correspondiente a través del siguiente enlace:
                    </p>
                    <div className='flex items-center '>
                        <IoIosLink />
                        <p className="mt-2"> [Enlace para comprar la licencia]</p>
                    </div>
                    <p className="mt-4">
                        Me gusta mucho lo que has hecho con la canción y me encantaría que siga disponible en las
                        plataformas digitales. Sin embargo, si no estás dispuesto a adquirir la licencia, tendré que
                        proceder con la solicitud de eliminación de la canción en dichas plataformas.
                    </p>
                    <p className="mt-4">
                        Por favor, házmelo saber en los próximos [X días] cómo deseas proceder. Prefiero resolver esto
                        de manera amistosa y apoyar a los artistas que respetan los derechos de los productores.
                    </p>
                    <p className="mt-4">Quedo atento a tu respuesta</p>
                    <p className="mt-4">Saludos cordiales,</p>
                    <p>[Tu Nombre] </p>
                    <p>[Tu Información de Contacto]</p>
                    <p>[Tu Página Web o Redes Sociales]</p>
                </div>
            </div>

            <div className="bg-[#1d2333] text-gray-300 max-w-2xl w-full mt-6 rounded-2xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-white mb-2">💡Cómo usar esta plantilla </h2>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Copia la plantilla usando el botón de arriba </li>
                    <li>Reemplaza todos los marcadores entre [corchetes] con la información relevante</li>
                    <li>Ajusta el tono y contenido según sea necesario para tu situación específica </li>
                    <li>Envía el mensaje a través de tu método de contacto preferido</li>

                </ol>

                <div className="bg-[#2f204c] p-3 mt-4 rounded-lg text-sm text-purple-300">
                    <strong>Recuerda:</strong>  El propósito de este mensaje es convertir al artista en un cliente. Ser amable y
                    profesional puede llevar a mejores resultados y potenciales relaciones comerciales a largo
                    plazo.
                </div>
            </div>
        </div>
    );
};

export default SpanishTemplate;