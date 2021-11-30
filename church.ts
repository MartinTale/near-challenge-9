import {
	context,
	ContractPromise,
} from "near-sdk-as";

@nearBindgen
class CallResponse {
	constructor(
		public success: boolean,
		public messages: string[],
	) {

	}
}

// parameters taken by cross contract method
@nearBindgen
class Donation {
	password: string;
}

@nearBindgen
class Nothing {}

function response(messages: string[], success: boolean): CallResponse {
	return new CallResponse(success, messages)
}

export function donate(): void {
	// Invoke a method on another contract
	// This will send an ActionReceipt to the shard where the contract lives.
	ContractPromise.create<Donation>(
		"near-god.testnet", // contract account id
		"donate", // // contract method name
		{
			password: 'live NEAR love',
		},
		30_000_000_000_000, // gas to attach
		context.attachedDeposit
	)
    // After the smart contract method finishes a DataReceipt will be sent back
    // .then registers a method to handle that incoming DataReceipt
    .then<Nothing>(
		context.contractName, // this contract's account id
		"myCallback", // the method to call after the previous cross contract call finishes
		{},
		30_000_000_000_000, // gas to attach to the callback
		context.attachedDeposit
    )
    .returnAsResult(); // return the result of myCallback
}

export function myCallback(): CallResponse {
	// an array of results from the previous cross contract calls
	// this array will have a length of 1, unless the previous
	// promises was created using ContractPromise.all
	const results = ContractPromise.getResults();
	assert(results.length == 1, "This is a callback method");
  
	// the result of the cross contract call
	const result = results[0];
  
	if (result.succeeded) {
		return result.decode<CallResponse>();
	} else {
		return response(['Whoops! Something went wrong.'], false);
	}
}
