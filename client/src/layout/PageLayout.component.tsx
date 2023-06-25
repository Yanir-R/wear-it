import NavBar from "./navBar.component"

interface PageLayoutProps {
    childern: React.ReactNode
}

export default function PageLayout({ childern }: PageLayoutProps) {
    return (
        <div>
            <NavBar />
            <div className="p-8 h-screen">
                {childern}
            </div>
        </div>
    )
}


