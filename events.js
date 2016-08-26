//our 'database'
var events = [
  {
    id: 1,
    name: 'Coachella',
    artists: ['Daft Punk']
  },
  {
    id: 2,
    name: 'Day of the Dead',
    artists: ['Prince', 'Michael Jackson']
  },
  {
    id: 3,
    name: 'EDC',
    artists: ['The Chainsmokers', 'Flume']
  }
];

exports.getAll = function() {
  return events;
};
