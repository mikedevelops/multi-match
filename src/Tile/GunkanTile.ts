import { AbstractTile, TileType } from "./AbstractTile";
import { loader } from "../index";
import * as PIXI from "pixi.js";

export class GunkanTile extends AbstractTile {
  getTexture(): PIXI.RenderTexture {
    // TODO: Sync texture loading
    // const base = PIXI.BaseRenderTexture.from(
    //   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAgCAYAAADtwH1UAAAAAXNSR0IArs4c6QAAA7FJREFUaIHtmU1oE0EYht8NzUGQqGCUtppUJeRSLFGhxENRCy1iSwWLRw96Eg/2IO3R9NgiWA+lJz16SkHBIhVaiweX4E9BcinFamOb0npQc9BDD/WQzHZ2MjM7m+7uNJAHlszOfLvfzvdm/g1UOJ++vIMA+WS+Nej7b11nbP5b2zewnm+ues6r/FPvvtr8i+pvpnIAwH0H7YO1IXmE9GKn7Z7UPyRz7ie0Tzb4QUD7pL8lGy5YFwk+UB1QXj5J82zNVM66aJ8GG/xMZqKW+iiTyQzZ7rPhgtDW71YAAIPbMe63iAJOWM83O9rIIC2iic7MZCbQ13O25peq0NczjwsXr/jqoxZI8FWDKrNTEcdM5ZBe7Cx3QUAwwSd8fD+vZCeqiFf5BLfBl0FammzMoGlyMlhe/YmHq9cAAKPxmaryRDxq2YnK6oFag0+LywZdNiiTMqkAdPABcIWgA9+6MG1//tKNuhKBhyyIPBvWjm4RPKGEArDB726JYK5YAgCEb6W5z2xVfo/dfiB6rWvIh/P+XV7ks+Us9DM8G/adsnLya9ksxnbHABndLREVM4utZ4/KjhamuV3TfkUkjmx66aacTZupnFiARDxa1ecTIdqmYtbFg24B9SACmYrKxgGnMUKlnGej1AIAYK5YwlyxhOdHD9ryeSKQFmA5rwMRvJgB1YKjAKPxGavvtwU/uVO+IBaBFWK/IlsMegmvi3OchkbGx/AYXfiXfwFMVQRIUovn5A6wZNhE+H43mArtJ1QWX7ypqFSARDyK5eERRMbHcKD9OjYny/nH730uJ4gQFREIbVMx/P1wc9fRHqajQWxHeIHbLox8i2MXlIhHURoeseVtTp4rJ5aM3YtXjr0FP0hUxFnPN7sW0cnesQsC7C2BQAdZ6LxOgj+4HUM2XJB2I2xZ1Zxe8IwTyrMgXkuQ4UXwdXQ/PDvRAswJpy2Kwe2YWgsgkJagaluP1NKXux18W9s3+NvRKngdWL//5X4PvoBadySC2o4ewqs3X7z7KhfoWASxK1P6YIaHbKfTjQ2L8ETMz7MB+kCGPvbTAXtWmw0XuIPtXqHfSfs0Tp9o2TlyMumJE7f8+rGEJ09fo/clf3fVb2YHTNy/cxU66x8iCR3OCbMDZuD+aZ8669/EZgDA4UPutp9V+f2nJCybHTADOxLljXW66q+8DmjgDw0BNNMQQDMNATTTEEAzDQE0E1pZKxrOZv6wslY0+ns7tPnv7+0wdNc/RBI6nJO0DhFonzrr/x86zwvx1uLBZwAAAABJRU5ErkJggg==\n"
    // );
    // const rt = PIXI.RenderTexture.create(base);

    return loader.resources.tiles.spritesheet.textures["tiles 2.aseprite"];
  }

  getType(): TileType {
    return TileType.Gunkan;
  }
}
