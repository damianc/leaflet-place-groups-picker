# leaflet-place-groups-picker

Plugin for the Leaflet maps that allows grouping places in groups whose visibility can be toggled.

## Installation

```
npm i -P leaflet-place-groups-picker
```

## How to use the plugin

<img src="https://github.com/damianc/leaflet-place-groups-picker/blob/main/doc/images/screenshot.png" alt="Example of use of the plugin" />

```
const map = L.map('map',{
  center: [52, 16],
  zoom: 6
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

/* add control to a map */

const grouping = L.control.placeGroupsPicker({
  position: 'topright',
  caption: 'Places'
});

map.addControl(grouping);

/* add groups */

grouping.addGroup('Malls', { map, color: 'gold' });
grouping.addGroup('Schools', { map, color: 'red' });

/* add places to groups */

grouping.addPoint('Malls', [50, 15]);
grouping.addPoint('Malls', [54, 15]);

grouping.addPoint('Schools', [50, 17]);
grouping.addPoint('Schools', [54, 17]);
```

### Options

| Option | Description | Default value |
|----|----|----|
| `position` | Where to place a control on the map (`topleft`, `topright`, `bottomleft` or `bottomright`). | no default value |
| `caption` | Caption to display in a control. | `Groups` |
| `captionColor` | Color of a caption text. | `#333` |
| `captionBackground` | Background color (or image/gradient) of a caption. | `rgba(255, 255, 255, .75)` |
| `captionArrowColor` | Color of a caption arrow indicating a list visibility state. | `#444` |
| `iconSize` | Size of icons. | `[30, 30]` |
| `iconShadow` | Whether to add a shadow to icons. | `false` |
| `iconInnerShadow` | Whether to add an inset shadow to icons. | `false` |
| `iconStyle` | Icon style: `rectangle`, `circle` or `rounded` | `rectangle` |

### `addGroup(name, options)`

Adds new group of places.

* `name` - name of a group
* `options`- options of a group:
  * `map` - a map reference
  * `color` - color of icons related to the group

### `addPoint(group, coords)`

Adds new point to a group.

* `group` - name of a group the point belongs to
* `coords` - coordinates of the point, declared as the `[lat, lng]` array

This method returns a marker reference, so that you can, for example, bind a popup to it:

```
const popupContent = `
  <div>
    <div style="font-size:14px"><strong>Popup Info</strong></div>
    <div style="font-size:10px">This is just popup bound to marker.</div>
  </div>
`;

grouping.addPoint('Schools', [54, 17]).bindPopup(popupContent);

// or:

const pointS1 = grouping.addPoint('Schools', [54, 17]);
pointS1.bindPopup(popupContent);
```

### `addPoints(group, coordsArray)`

Adds new points to a group.

* `group` - name of a group the points belong to
* `coordsArray` - array of coordinates declared as the `[lat, lng]` array

This method returns an array of markers references, so that you can, for example, bind a popup to them.

```
const popupContent = `
  <div>
    <div style="font-size:14px"><strong>Popup Info</strong></div>
    <div style="font-size:10px">This is just popup bound to marker.</div>
  </div>
`;

const [first, second] = grouping.addPoints('Schools', [
  [54, 17],
  [52, 18]
]);

first.bindPopup(popupContent);
second.bindPopup(popupContent);
```

## Operations on markers

### Removing marker from a map

Markers can be easily removed by the `remove()` method inherited from the [`Layer`](https://leafletjs.com/reference-1.7.1.html#layer) class:

```
const pointA = grouping.addPoint('Factory', [50, 15]);

setTimeout(() => {
  pointA.remove();
}, 2000);
```

### Removing marker only from a group

```
const pointA = grouping.addPoint('Factory', [50, 15]);

setTimeout(() => {
  pointA.removeFromGroup();
}, 2000);
```