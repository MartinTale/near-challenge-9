Challenge #9 - NEAR God and Churches

NEAR God is recruiting and taking donations.

**See most successful churches**

```
near view near-god.testnet viewChurches

[
  { key: 'cat-church.testnet', value: { donations: '20000' } },
  { key: 'dog-church.testnet', value: { donations: '10000' } },
  { key: 'human-church.testnet', value: { donations: '10000' } }
]
```

**Become your own church if you know the password**

```
near call near-god.testnet donate '{ "password": "wrong password" }' --accountId martint.testnet --gas 300000000000000

{ success: false, messages: [ 'YOU SHALL NOT PASS!' ] }
```

**Donate** any amount to **Cat church**

```
near call cat-church.testnet donate --accountId martint.testnet --gas 300000000000000 --deposit 0.00000000000000000001

{
  success: true,
  messages: [
    'Thank you for 10000 yoctoNEAR donation!',
    'cat-church.testnet have collected 20000 yoctoNEAR in donations!'
  ]
}
```

**Donate** any amount to **Dog church**

```
near call dog-church.testnet donate --accountId martint.testnet --gas 300000000000000 --deposit 0.00000000000000000001
```

**Donate** any amount to **Human church**

```
near call human-church.testnet donate --accountId martint.testnet --gas 300000000000000 --deposit 0.00000000000000000001
```

Want to be sneaky? **Pretend to donate**

```
near call cat-church.testnet donate --accountId martint.testnet --gas 300000000000000

{
  success: false,
  messages: [ 'YOU SHALL NOT PASS! Maybe some NEAR deposit will help? :)' ]
}
```
