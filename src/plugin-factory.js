export function pluginFactory(L) {

  class PlaceGroupsPicker extends L.Control {
    groupsStates = {};
    groupsThemes = {};
    groupsRefs = {};

    #opts;
    #listShown = false;
    #controlBox;
    #controlCaption;
    #controlListWrapper;
    #controlList;

    /*
     * Control settings.
     * @typedef {Object} PluginOptions
     * @property {string} caption - caption in the control
     * @property {[number, number]} iconSize - size of icons
     * @property {boolean} iconShadow - whether to add shadow to icons
     * @property {boolean} iconInnerShadow - whether to add inset shadow to icons
     * @property {(rectangle|circle|rounded)} iconStyle - style of icons
     */

    /*
     * Constructs a control.
     * @constructor
     * @param {PluginOptions} opts - Settings of a control.
     */

    constructor(opts) {
      super(opts);
      this.#setOpts(opts);
    }

    /*
     * @method onAdd
     */

    onAdd = () => {
      this.#controlBox = L.DomUtil.create('div', 'place-groups');
      this.#controlCaption = L.DomUtil.create('div', 'place-groups__caption', this.#controlBox);
      this.#controlListWrapper = L.DomUtil.create('div', 'place-groups__list--wrapper', this.#controlBox);
      this.#controlList = L.DomUtil.create('div', 'place-groups__list', this.#controlListWrapper);

      this.#buildMarkup();

      L.DomUtil.disableTextSelection();
      L.DomEvent.disableClickPropagation(this.#controlBox);
      L.DomEvent.disableScrollPropagation(this.#controlBox);
      L.DomEvent.on(this.#controlCaption, 'click', this.toggleList);
      L.DomEvent.on(this.#controlList, 'click', this.toggleListItem);

      return this.#controlBox;
    };

    /*
     * @method onRemove
     */

    onRemove = () => {
      L.DomEvent.off(this.#controlCaption, 'click', this.toggleList);
      L.DomEvent.off(this.#controlList, 'click', this.toggleListItem);
    };

    /*
      Group settings.
     * @typedef {Object} GroupOptions
     * @property {string} color - color of a icon related to the group
     * @property {L.Map} map - map the group is to be added to
     */ 

    /*
     * @method addGroup
     * @param {string} name - Name of a group.
     * @param {GroupOptions} options - Settings of a group.
     */

    addGroup = (name, { color, map }) => {
      this.groupsStates[name] = true;
      this.groupsThemes[name] = color;
      this.groupsRefs[name] = L.featureGroup().addTo(map);
      this.groupsRefs[name].linkedMap = map;

      const groupItem = L.DomUtil.create('div', 'place-groups__list-item', this.#controlList);
      groupItem.textContent = name;
      groupItem.style.setProperty('--icon-color', color);
      groupItem.dataset.groupName = name;
    };

    /*
     * @method addPoint
     * @param {string} groupName - Name of a group.
     * @param {[number, number]} coords - Coordinates of a point.
     */

    addPoint = (groupName, coords) => {
      const iconColor = this.groupsThemes[groupName];
      const iconShadow = this.#getIconShadow();
      const iconClassName = this.#getIconClassName();

      const iconStyle = `background-color:${iconColor}; box-shadow:${iconShadow}`;

      const icon = L.divIcon({
        iconSize: this.#opts.iconSize,
        className: 'icon',
        html: `<div class="${iconClassName}" style="${iconStyle}"></div>`
      });

      const marker = L.marker(
        coords, { icon }
      );

      marker.addTo(this.groupsRefs[groupName]);
      return marker;
    };

    /*
     * @method addPoints
     * @param {string} groupName - Name of a group.
     * @param {[number, number][]} coordsArr - Array of points declared by coordinates.
     */

    addPoints = (groupName, coordsArr) => {
      return coordsArr.map(coords => {
        return this.addPoint(groupName, coords);
      });
    };

    /*
     * @method toggleList
     */

    toggleList = () => {
      this.#listShown = !this.#listShown;

      if (this.#listShown) {
        L.DomUtil.addClass(this.#controlListWrapper, 'show');
        L.DomUtil.removeClass(this.#controlListWrapper, 'hide');
      } else {
        L.DomUtil.addClass(this.#controlListWrapper, 'hide');
        L.DomUtil.removeClass(this.#controlListWrapper, 'show');
      }
    };

    /*
     * @method toggleListItem
     * @param {Event} e - Event object.
     */

    toggleListItem = (e) => {
      const { target } = e;
      const { groupName } = target.dataset;

      if (this.groupsStates[groupName]) {
        this.groupsStates[groupName] = false;
        target.style.opacity = .25;
        this.groupsRefs[groupName].remove();
      } else {
        this.groupsStates[groupName] = true;
        target.style.opacity = 1;
        this.groupsRefs[groupName].addTo(this.groupsRefs[groupName].linkedMap);
      }
    };

    /*
     * @method setOpts
     * @param {PluginOptions} opts - Settings of a control.
     */

    #setOpts = (opts) => {
      this.#opts = opts;

      if (opts.iconSize && Array.isArray(opts.iconSize)) {
        this.#opts.iconSize = opts.iconSize;
      } else {
        this.#opts.iconSize = [30, 30];
      }
    };

    /*
     * @method buildMarkup
     */

    #buildMarkup = () => {
      this.#controlCaption.textContent = this.#opts.caption || 'Groups';
    };

    /*
     * @method getIconShadow
     */

    #getIconShadow = () => {
      let iconShadow = '';

      if (this.#opts.iconShadow || this.#opts.iconInnerShadow) {
        if (this.#opts.iconShadow) {
          iconShadow += '#000 1px 1px 10px';
        }
        if (this.#opts.iconInnerShadow) {
          if (this.#opts.iconShadow) iconShadow += ', ';
          iconShadow += 'inset rgba(0, 0, 0, .5) 1px 1px 10px';
        }
      } else {
        iconShadow = 'none';
      }

      return iconShadow;
    };

    /*
     * @method getIconClassName
     */

    #getIconClassName = () => {
      let iconClassName = 'icon-div';

      if (this.#opts.iconStyle) {
        if (this.#opts.iconStyle == 'rounded') {
          iconClassName += ' icon-rounded';
        } else if (this.#opts.iconStyle == 'circle') {
          iconClassName += ' icon-circle';
        }
      }

      return iconClassName;
    };
  }

  L.control.placeGroupsPicker = opts => {
    return new PlaceGroupsPicker(opts);
  };

}