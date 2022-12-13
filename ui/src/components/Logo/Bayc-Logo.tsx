import RawLogo from "../../assets/bayc.png"

export const BaycLogo = () => {
    return <div className="h-full w-[50px] rounded-full bg-transparent flex items-center">
        <div className="h-[50px] w-[50px] flex justify-center">
            <img src={RawLogo} alt="Bored Apes Yacht Club" className="h-full w-auto" />
        </div>
    </div>
}