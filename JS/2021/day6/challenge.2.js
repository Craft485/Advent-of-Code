// TODO: Adapt from browser to node
const inputData = require('fs').readFileSync('./input.txt', { encoding: 'utf-8' }).toString('utf-8').trim()
w=(
    h=>{
        for(c=Array(9).fill(0),inputData.split(',').map(r=>c[r|0]+=1),i=h;i--;)
        a=c.shift(),
        c[6]+=a,
        c[8]=a;
        c.map(r=>i+=r);
        return i+1
    }
);
console.log([w(80),w(256)])