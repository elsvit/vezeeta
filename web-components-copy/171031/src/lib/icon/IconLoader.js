import Icons from './icons.json';

class IconLoader {
  static getIcon(name) {
    const iconName = `ic_${name}`;
    let requestedIcon;

    Icons.icons.forEach((icon) => {
      if (icon.properties.name === iconName) {
        requestedIcon = icon;
      }
    }, this);

    return requestedIcon;
  }
}

export default IconLoader;
