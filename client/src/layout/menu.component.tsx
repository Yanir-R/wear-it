import Link from 'next/link';
import { MouseEventHandler } from 'react';

interface LinkBoxProps {
    url: string;
    onClick?: MouseEventHandler<HTMLDivElement> | undefined;
    linkText: string;
}

interface MenuProps {
    onLinkClick?: () => void;
}

const LinkBox: React.FC<LinkBoxProps> = ({ url, onClick, linkText }) => {
    return (
        <Link legacyBehavior href={url}>
            <div
                className="block md:inline-block px-3 py-2 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                onClick={onClick}
            >
                <a id='link'>{linkText}</a>
            </div>
        </Link>
    );
}

const Menu: React.FC<MenuProps> = ({ onLinkClick }) => {
    return (
        <div className="px-2 md:px-0 py-3 space-y-2 md:space-y-0 md:space-x-2 font-medium text-slate-700">
            <LinkBox url="/" onClick={onLinkClick} linkText="Home" />
            <LinkBox url="/clothesList" onClick={onLinkClick} linkText="Clothing Items List" />
            <LinkBox url="/chooseYourClothing" onClick={onLinkClick} linkText="Choose your Clothing" />
            <LinkBox url="/savedClothes" onClick={onLinkClick} linkText="Saved Clothing List" />
        </div>
    )
}

export default Menu;
