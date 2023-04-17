import './AboutPanel.css';

export const AboutPanel: React.FC = () => (
    <div className='aboutPanel-wrapper'>
        <p>Welcome to the shortest route between "How do I make the best potions to ...?" and the info you need to craft those potions.</p>
        <p>From the landing page, pick the type of potion, then select from the list of narrowing options. This will bring up the most potent recipes for your brewing goal.</p>
        <p>Simply click the DONE button on each recipe to clear it from the list.</p>
        <p>Pro tip: swipe any ingredient(s) to the left to mark it as "used up" before clicking DONE on a recipe. This will remove any other recipes that also require that ingredient.</p>
        <hr className='aboutPanel-separator'></hr>
        <p>Content/Data/Calculations for this app (including images) were pulled from the "Alchemy Effects" and other articles on the <a href='https://en.uesp.net/wiki/Skyrim:Alchemy_Effects' target='_blank' rel='noreferrer noopener'>Unofficial Elder Scrolls Pages</a> wiki, as well as Bethesda's official Creation Kit tool.</p>
        <hr className='aboutPanel-separator'></hr>
        <p>This app was lovingly crafted by <a href="https://urtropedesigns.com/" target="_blank" rel="noreferrer noopener">Urtrope Designs</a>.</p>
        <p>For those concerned with privacy: this app never captures or records any personally identifying data whatsoever. There's nothing more to say, but if you want to read it again in a different context, feel free to read my <a href="https://urtropedesigns.com/about/privacy-policy-potion-companion" target="_blank" rel="noreferrer noopener">privacy policy</a>.</p>
    </div>
)