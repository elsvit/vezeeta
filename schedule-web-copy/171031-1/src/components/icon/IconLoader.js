import Icons from '../../utils/icons.json';

class IconLoader {
  static getIcon(iconName) {
    iconName = 'ic_' + iconName;
    let requestedIcon;

    Icons.icons.forEach(icon => {
      if (icon.properties.name === iconName) {
        requestedIcon = icon;
      }
    }, this);

    return requestedIcon;
  }
}

export default IconLoader;
