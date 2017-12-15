const Gate = rootRequire('./Gate');
const guards = rootRequire('./guards');

const gate = new Gate('/gate');

gate
.lane()
.guard()
.passenger(() => () => {

});

export default gate;
