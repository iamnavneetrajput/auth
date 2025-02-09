// PageHeader.js
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface PageHeaderProps {
    title: string;
    paragraph: string;
    buttonText?: string;
    buttonLink?: string;
    className?: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title, paragraph, buttonText, buttonLink, className }) => {
    return (
        <>
        <div className={`home ${className}`}>
            <h1>{title}</h1>
            <p className="">{paragraph}</p>
            {buttonText && buttonLink && (
                <Link to={buttonLink}>
                    <button className='Explore'>{buttonText}</button>
                </Link>
            )}
        </div>
        </>
    );
};

export default PageHeader;
