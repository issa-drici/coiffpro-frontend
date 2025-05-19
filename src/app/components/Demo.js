import Image from 'next/image'

const Demo = () => {
    return (
        <section className="py-10 md:py-16 w-full bg-transparent">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Voyez par vous-même
                </h2>
            </div>
            <div className="w-full max-w-5xl h-[250px] md:h-[500px] bg-gray-100 rounded-2xl mx-auto relative overflow-hidden">
                <Image
                    src="/images/bg-login.avif"
                    alt="Démo illustration"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 80vw"
                />
            </div>
        </section>
    )
}

export default Demo
