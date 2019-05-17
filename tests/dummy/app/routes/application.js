import Route from '@ember/routing/route';

import { computed } from '@ember/object';

export default Route.extend({

  definitionString: computed('controller.definition.{nodes,edges}', function(){
    const definition = this.get('controller').get('definition');

    // console.log(definition); // eslint-disable-line
    return JSON.stringify(definition, null, 4);
  }),

  setupController() {

    this.get('controller').set('definition', transform(definition));

    this.get('controller').set('definitionString', this.get('definitionString'));

    setInterval(() => {
      this.notifyPropertyChange('definitionString');
      this.get('controller').set('definitionString', this.get('definitionString'));
    }, 500);
  }
});

const transform = (definition) => {
  definition.nodes.forEach((node) => {
    node.label = node.text;
    delete node.text;
  });

  definition.edges.forEach((edge) => {
    edge.label = edge.data.label;
    edge.type = edge.data.type;
    delete edge.data;
  });

  delete definition.groups;
  delete definition.ports;
  return definition;
};

const definition = {
  "nodes": [
    {
      "id": "start",
      "type": "start",
      "text": "Start",
      "left": 50,
      "top": 50,
      "width": 100,
      "height": 70
    },
    {
      "id": "question1",
      "type": "question",
      "text": "Do Something?",
      "left": 316,
      "top": 61,
      "width": 150,
      "height": 150
    },
    {
      "id": "decide",
      "type": "action",
      "text": "Make Decision",
      "left": 590,
      "top": 273,
      "width": 120,
      "height": 120
    },
    {
      "id": "something",
      "type": "output",
      "text": "Do Something",
      "left": 827,
      "top": 414,
      "width": 120,
      "height": 50
    },
    {
      "id": "question2",
      "type": "question",
      "text": "Do Nothing?",
      "left": 215,
      "top": 293,
      "width": 150,
      "height": 150
    },
    {
      "id": "nothing",
      "type": "output",
      "text": "Do Nothing",
      "left": 396,
      "top": 548,
      "width": 100,
      "height": 50
    }
  ],
  "edges": [
    {
      "source": "start",
      "target": "question1",
      "data": {}
    },
    {
      "source": "question1",
      "target": "decide",
      "data": {
        "label": "yes",
        "type": "connection"
      },
      "geometry": {
        "segments": [
          [
            496,
            136
          ],
          [
            650,
            136
          ],
          [
            650,
            243
          ]
        ],
        "source": [
          466,
          136,
          1,
          0.5,
          1,
          0
        ],
        "target": [
          650,
          273,
          0.5,
          0,
          0,
          -1
        ]
      }
    },
    {
      "source": "question1",
      "target": "question2",
      "data": {
        "label": "no",
        "type": "connection"
      }
    },
    {
      "source": "decide",
      "target": "nothing",
      "data": {
        "label": "Can't Decide",
        "type": "connection"
      },
      "geometry": {
        "segments": [
          [
            650,
            423
          ],
          [
            650,
            630
          ],
          [
            453,
            630
          ]
        ],
        "source": [
          650,
          393,
          0.5,
          1,
          0,
          1
        ],
        "target": [
          423,
          630,
          1,
          0.5,
          1,
          0
        ]
      }
    },
    {
      "source": "decide",
      "target": "something",
      "data": {
        "label": "Decision Made",
        "type": "connection"
      }
    },
    {
      "source": "question2",
      "target": "decide",
      "data": {
        "label": "no",
        "type": "connection"
      }
    },
    {
      "source": "question2",
      "target": "nothing",
      "data": {
        "label": "yes",
        "type": "connection"
      },
      "geometry": {
        "segments": [
          [
            185,
            368
          ],
          [
            185,
            630
          ],
          [
            293,
            630
          ]
        ],
        "source": [
          215,
          368,
          0,
          0.5,
          -1,
          0
        ],
        "target": [
          323,
          630,
          0,
          0.5,
          -1,
          0
        ]
      }
    }
  ],
  "ports": [],
  "groups": []
};
