import lightGallery from 'lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import 'lightgallery/css/lightgallery-bundle.css';

function image(path) {
    return new URL(path, import.meta.url).href;
}

const galleryImagesByProjectId = {
    prj1: [
        {
            src: new URL('/images/projects/orsu1.avif', import.meta.url).href,
            thumb: new URL('/images/projects/orsu1.avif', import.meta.url).href,
            subHtml: '<h4>o-rs-u</h4><p>A Rust implementation of the popular rhythm game</p>',
        },
        {
            src: new URL('/images/projects/orsu2.avif', import.meta.url).href,
            thumb: new URL('/images/projects/orsu2.avif', import.meta.url).href,
            subHtml: '<h4>o-rs-u</h4><p>Gameplay preview</p>',
        },
        {
            src: new URL('/images/projects/orsu3.avif', import.meta.url).href,
            thumb: new URL('/images/projects/orsu3.avif', import.meta.url).href,
            subHtml: '<h4>o-rs-u</h4><p>Another in-game screenshot</p>',
        },
    ],
    prj2: [
        {
            src: new URL('/images/projects/mlab1.avif', import.meta.url).href,
            thumb: new URL('/images/projects/mlab1.avif', import.meta.url).href ,
            subHtml: '<h4>Matlab image analysis</h4><p>Image analysis output</p>',
        },
        {
            src: new URL('/images/projects/mlab2.avif', import.meta.url).href,
            thumb: new URL('/images/projects/mlab2.avif', import.meta.url).href,
            subHtml: '<h4>Matlab image analysis</h4><p>Second analysis output</p>',
        },
    ],
};

const sharedGalleryOptions = {
    plugins: [lgZoom, lgThumbnail],
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
};

const activeGalleries = new Map();

function cleanupGallery(projectId) {
    const active = activeGalleries.get(projectId);
    if (!active) return;

    active.instance.destroy();
    active.mountEl.remove();
    activeGalleries.delete(projectId);
}

function openProjectGallery(projectId, startIndex = 0) {
    const images = galleryImagesByProjectId[projectId];
    if (!images || images.length === 0) return;

    cleanupGallery(projectId);

    const mountEl = document.createElement('div');
    document.body.appendChild(mountEl);

    const instance = lightGallery(mountEl, {
        ...sharedGalleryOptions,
        dynamic: true,
        dynamicEl: images,
        index: startIndex,
    });

    activeGalleries.set(projectId, { instance, mountEl });
    instance.openGallery(startIndex);

    mountEl.addEventListener(
        'lgAfterClose',
        () => {
            const active = activeGalleries.get(projectId);
            if (active && active.instance === instance) {
                cleanupGallery(projectId);
            }
        },
        { once: true }
    );
}

function bindProjectGallery(projectId) {
    const trigger = document.querySelector(`#${projectId} .featured-project__image`);
    if (!trigger) return;

    trigger.addEventListener('click', (event) => {
        event.preventDefault();
        openProjectGallery(projectId, 0);
    });
}

Object.keys(galleryImagesByProjectId).forEach(bindProjectGallery);





