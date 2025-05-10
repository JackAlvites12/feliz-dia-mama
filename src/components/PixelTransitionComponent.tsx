import PixelTransition from "../Animations/PixelTransition/PixelTransition"

export const PixelTransitionComponent = () => {

    return(
        <PixelTransition
			firstContent={
				<img src="https://i.pinimg.com/736x/2f/30/51/2f305160bdaccb8eb6942cc0c812e57a.jpg"
					alt="default pixel transition content, a cat!"
					style={{ width: "100%", height: "100%", objectFit: "cover" }} />
			}
			secondContent={
				<div
					style={{
						width: "100%",
						height: "100%",
						display: "grid",
						placeItems: "center",
						backgroundColor: "#111"
					}}
				>
				<p className="font-medium text-lg text-white text-balance">Cada abrazo tuyo es un refugio, cada palabra, una guía. Gracias por sostener a tu familia con tanto amor.</p>
				</div>
			}
			gridSize={12}
			pixelColor='#ffffff'
			animationStepDuration={0.4}
			className="custom-pixel-card mx-auto"
		/>
    )

}