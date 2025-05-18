const Suivi = () => {
    return (
        <div className="flex flex-col justify-center items-center max-w-2xl mx-auto p-4 font-sans">
            <h1 className="mb-4 font-bold underline text-4xl">
                Suivi de la file d'attente
            </h1>
            <h2 className="mb-4 font-bold text-2xl">
                Votre place dans la file d'attente
            </h2>
            <p className="font-bold">N°</p>
            <p>Votre tour sera dans : </p>
            <p className="font-bold">XX minutes.</p>
            <p> Soyez présent dans : </p>
            <p className="font-bold">XX minutes.</p>
        </div>
    )
}

export default Suivi
