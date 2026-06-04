import lightGallery from 'lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import 'lightgallery/css/lightgallery-bundle.css';

const prj1Image1 = new URL('/images/projects/orsu1.png', import.meta.url).href;
const prj1Image2 = new URL('/images/projects/orsu2.png', import.meta.url).href;
const prj1Image3 = new URL('/images/projects/orsu3.png', import.meta.url).href;


const prj1Images = [
    { src: prj1Image1, thumb: prj1Image1, subHtml: '<h4>Caption 1</h4>' },
    { src: prj1Image2, thumb: prj1Image2, subHtml: '<h4>Caption 2</h4>' },
    { src: prj1Image3, thumb: prj1Image3, subHtml: '<h4>Caption 3</h4>' },
];

const prj1Trigger = document.querySelector('#prj1 a');
let prj1Gallery = null;

function openPrj1Gallery(startIndex = 0) {
    if (prj1Gallery) {
        prj1Gallery.destroy();
        prj1Gallery = null;
    }

    const mountEl = document.createElement('div');
    document.body.appendChild(mountEl);

    prj1Gallery = lightGallery(mountEl, {
        plugins: [lgZoom, lgThumbnail],
        dynamic: true,
        dynamicEl: prj1Images,
        index: startIndex,
        speed: 400,
        counter: true,
        download: true,
        zoom: true,
        scale: 1,
        thumbnail: true,
        animateThumb: true,
        thumbWidth: 100,
        thumbHeight: '65px',
        toggleThumb: true,
        swipeToClose: true,
        closable: true,
    });

    prj1Gallery.openGallery(startIndex);

    mountEl.addEventListener('lgAfterClose', () => {
        if (prj1Gallery) {
            prj1Gallery.destroy();
            prj1Gallery = null;
        }
        mountEl.remove();
    });
}

if (prj1Trigger) {
    prj1Trigger.addEventListener('click', (event) => {
        event.preventDefault();
        openPrj1Gallery(0);
    });
}





