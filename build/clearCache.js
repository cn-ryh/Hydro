const superagent = require('superagent');
const secret = process.env.GITHUB_TOKEN;
let res = {
    "total_count": 6,
    "actions_caches": [
        {
            "id": 3818,
            "ref": "refs/heads/master",
            "key": "codeql-trap-1-2.19.4-javascript-8465cd9f0a02ac6298df35b4cd460a25c5d371d9",
            "version": "801c2033d34f5527515cf4db177503fe272d4179b9f27199bff1b2af3a149cfb",
            "last_accessed_at": "2024-12-08T22:30:29.330000000Z",
            "created_at": "2024-12-08T22:30:29.330000000Z",
            "size_in_bytes": 13541990
        },
        {
            "id": 3817,
            "ref": "refs/heads/master",
            "key": "cache-refs/heads/master-181c5cb4a4b1ea232fde46756685a31937935504",
            "version": "e699f7f44853330242e7b1eb3a5269ce504726bdb28cfd13a5695e26cb8f159b",
            "last_accessed_at": "2024-12-08T22:28:36.103333300Z",
            "created_at": "2024-12-08T04:55:40.613333300Z",
            "size_in_bytes": 223122302
        },
        {
            "id": 3816,
            "ref": "refs/heads/master",
            "key": "codeql-trap-1-2.19.4-javascript-181c5cb4a4b1ea232fde46756685a31937935504",
            "version": "801c2033d34f5527515cf4db177503fe272d4179b9f27199bff1b2af3a149cfb",
            "last_accessed_at": "2024-12-08T04:54:23.300000000Z",
            "created_at": "2024-12-08T04:54:23.300000000Z",
            "size_in_bytes": 13531157
        },
        {
            "id": 3812,
            "ref": "refs/heads/master",
            "key": "cache-refs/heads/master-ac35a6ec45b1409561ddd0ef991b6f3301d0d45f",
            "version": "e699f7f44853330242e7b1eb3a5269ce504726bdb28cfd13a5695e26cb8f159b",
            "last_accessed_at": "2024-12-08T04:52:34.186666700Z",
            "created_at": "2024-12-01T09:38:34.273333300Z",
            "size_in_bytes": 223119903
        },
        {
            "id": 3815,
            "ref": "refs/pull/917/merge",
            "key": "cache-refs/pull/917/merge-4a0b15c9f60eb0ec6efcbee483809297da595487",
            "version": "e699f7f44853330242e7b1eb3a5269ce504726bdb28cfd13a5695e26cb8f159b",
            "last_accessed_at": "2024-12-07T07:59:12.490000000Z",
            "created_at": "2024-12-07T07:59:12.490000000Z",
            "size_in_bytes": 223121755
        },
        {
            "id": 3814,
            "ref": "refs/pull/916/merge",
            "key": "cache-refs/pull/916/merge-db0588e0346efcdd7dafd6855aae00b43b00efb6",
            "version": "e699f7f44853330242e7b1eb3a5269ce504726bdb28cfd13a5695e26cb8f159b",
            "last_accessed_at": "2024-12-07T07:30:22.040000000Z",
            "created_at": "2024-12-07T07:30:22.040000000Z",
            "size_in_bytes": 223122979
        }
    ]
}
async function main() {
    // const res = await superagent.get('https://api.github.com/repos/hydro-dev/Hydro/actions/caches')
    //     .set('Accept', 'application/vnd.github+json')
    //     .set('User-Agent', 'Hydro')
    //     .set('Authorization', `Bearer ${secret}`);
    console.log(`Total ${res.body.total_count}`);
    console.log(res.body.actions_caches.map((i) => i.key));
    await Promise.all(res.body.actions_caches.map((i) => superagent
        .delete(`https://api.github.com/repos/hydro-dev/Hydro/actions/caches?key=${i.key}`)
        .set('Accept', 'application/vnd.github+json')
        .set('User-Agent', 'Hydro')
        .set('Authorization', `Bearer ${secret}`)));
}
main();
