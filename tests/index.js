const toTest = process.argv.slice(2).filter(f => f.startsWith('--')).map(f => f.substring(2));

if (toTest.includes('server')) {
    console.log('Testing server');
    require('./server')
}
