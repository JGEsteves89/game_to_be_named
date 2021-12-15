export default class SpriteSheet {
    constructor(image, w, h) {
        this.image = image;
        this.width = w;
        this.height = h;
        this.tiles = new Map();
    }

    define(name, x, y, tileWidth, tileHeight) {
        const buffer = document.createElement('canvas');
        buffer.height = this.height;
        buffer.width = this.width;
        buffer
            .getContext('2d')
            .drawImage(
                this.image,
                x,
                y,
                tileWidth,
                tileHeight,
                0,
                0,
                this.width,
                this.height);
        this.tiles.set(name, buffer);
    }
}
