import RollingGallery from "./RollingGallery/RollingGallery"

export const RollingGalleryComponent = () => {
    return(
        <div className="text-center text-white opacity-0 fade-in-delay my-10">
			<h2 className="text-6xl font-bold">Más recuerdos bellos</h2>
			<RollingGallery autoplay={true} pauseOnHover={true} />
		</div>
    )
}