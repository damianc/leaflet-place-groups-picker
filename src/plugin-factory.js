export function pluginFactory(L) {

  const defaults = {
    caption: 'Groups',
    captionColor: '#333',
    captionBackground: 'rgba(255, 255, 255, .75)',
    iconSize: [30, 30]
  }

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
     * @property {string} captionColor - color of caption text
     * @property {string} captionBackground - background color of caption
     * @property {string} captionArrowColor - color of caption arrow
     * @property {[number, number]} iconSize - size of icons
     * @property {boolean} iconShadow - whether to add shadow to icons
     * @property {boolean} iconInnerShadow - whether to add inset shadow to icons
     * @property {(rectangle|circle|rounded)} iconStyle - style of icons
     * @property {boolean} static - disable toggling visibility of groups
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
      L.DomEvent.on(this.#controlCaption, 'click', this.#toggleList);

      if (!this.#opts.static) {
        L.DomEvent.on(this.#controlList, 'click', this.#toggleListItem);
      } else {
        L.DomUtil.addClass(this.#controlList, 'list-static');
      }

      return this.#controlBox;
    };

    /*
     * @method onRemove
     */

    onRemove = () => {
      L.DomEvent.off(this.#controlCaption, 'click', this.#toggleList);

      if (!this.#opts.static) {
        L.DomEvent.off(this.#controlList, 'click', this.#toggleListItem);
      }
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
     * @returns {L.FeatureGroup} The newly added group reference.
     */

    addGroup = (name, { color, map }) => {
      const groupRef = L.featureGroup().addTo(map);

      Object.defineProperty(groupRef, 'linkedMap', {
        value: map
      });

      this.groupsStates[name] = true;
      this.groupsThemes[name] = color;
      this.groupsRefs[name] = groupRef;

      const groupItem = L.DomUtil.create('div', 'place-groups__list-item', this.#controlList);
      groupItem.textContent = name;
      groupItem.style.setProperty('--icon-color', color);
      groupItem.dataset.groupName = name;

      return groupRef;
    };

    /*
     * @method addPoint
     * @param {string} groupName - Name of a group.
     * @param {[number, number]} coords - Coordinates of a point.
     * @returns {L.Marker} The newly added marker reference.
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

      this.#decorateMarker(marker, { groupName });

      marker.addTo(this.groupsRefs[groupName]);
      return marker;
    };

    /*
     * @method addPoints
     * @param {string} groupName - Name of a group.
     * @param {[number, number][]} coordsArr - Array of points declared by coordinates.
     * @returns {L.Marker[]} Array of references to the newly added markers.
     */

    addPoints = (groupName, coordsArr) => {
      return coordsArr.map(coords => {
        return this.addPoint(groupName, coords);
      });
    };

    /*
     * Object with points and group-specific data.
     * @typedef GroupData
     * @property {string} color - color of icons related to the group
     * @points {[number, number][]} - array of points declared as [lat, lng] array
     */

    /*
     * @method addData
     * @param {L.Map} map - Map the data is to be added on.
     * @param {{string, GroupData}} data - Object with groups and points to add to the map.
     */

    addData = (map, data) => {
      Object.keys(data).forEach(group => {
        const groupData = data[group];

        if (!this.groupsRefs[group]) {
          this.addGroup(group, { map, color: groupData.color });
        }

        if (Array.isArray(groupData.points)) {
          this.addPoints(group, groupData.points);
        }
      });
    };

    /*
     * @method getGroupRef
     * @param {string} groupName - name of a group whose reference is to be returned.
     * @returns {L.FeatureGroup} A FeatureGroup related to the group.
     */

    getGroupRef = (groupName) => {
      return this.groupsRefs[groupName];
    };

    /*
     * @method toggleList
     */

    #toggleList = () => {
      this.#listShown = !this.#listShown;

      if (this.#listShown) {
        L.DomUtil.addClass(this.#controlListWrapper, 'show');
        L.DomUtil.removeClass(this.#controlListWrapper, 'hide');
        L.DomUtil.addClass(this.#controlCaption, 'open');
        L.DomUtil.removeClass(this.#controlCaption, 'closed');
      } else {
        L.DomUtil.addClass(this.#controlListWrapper, 'hide');
        L.DomUtil.removeClass(this.#controlListWrapper, 'show');
        L.DomUtil.addClass(this.#controlCaption, 'closed');
        L.DomUtil.removeClass(this.#controlCaption, 'open');
      }
    };

    /*
     * @method toggleListItem
     * @param {Event} e - Event object.
     */

    #toggleListItem = (e) => {
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
        this.#opts.iconSize = defaults.iconSize;
      }
    };

    /*
     * @method buildMarkup
     */

    #buildMarkup = () => {
      this.#controlCaption.textContent = this.#opts.caption || defaults.caption;
      this.#controlCaption.classList.add('closed');
      this.#controlCaption.style.color = this.#opts.captionColor || defaults.captionColor;
      this.#controlCaption.style.background = this.#opts.captionBackground || defaults.captionBackground;

      L.DomUtil.create('div', 'place-groups__caption-arrow', this.#controlCaption);

      if (this.#opts.captionArrowColor) {
        this.#controlCaption.style.setProperty('--caption-arrow-color', this.#opts.captionArrowColor);
      }
    };

    /*
     * Info related to a marker.
     * @typedef MarkerMetaInfo
     * @property {string} groupName - name of a group the marker belongs to 
     */

    /*
     * @method decorateMarker
     * @param {L.Marker} marker - marker reference for a point
     * @param {MarkerMetaInfo} info - info related to the marker
     */

    #decorateMarker = (marker, { groupName }) => {
      const that = this;

      Object.defineProperty(marker, 'removeFromGroup', {
        value: function () {
          this.removeFrom(that.groupsRefs[groupName]);
        }
      });
    };

    /*
     * @method getIconShadow
     * @returns {string} String for box-shadow CSS property.
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
     * @returns {string} Class name for an icon.
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