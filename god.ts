import {
	context,
	PersistentUnorderedMap,
	MapEntry,
	u128,
} from "near-sdk-as";

@nearBindgen
class Church {
	donations: u128;

	constructor() {
		this.donations = new u128(0);
	}
}

@nearBindgen
class CallResponse {
	constructor(
		public success: boolean,
		public messages: string[],
	) {

	}
}

const churches = new PersistentUnorderedMap<string, Church>("m");

function response(messages: string[], success: boolean): CallResponse {
	return new CallResponse(success, messages)
}

export function donate(password: string): CallResponse {
	if (password != 'live NEAR love') {
		return response(['YOU SHALL NOT PASS!'], false);
	}
	
	if (u128.eq(context.attachedDeposit, new u128(0))) {
		return response(['YOU SHALL NOT PASS! Maybe some NEAR deposit will help? :)'], false);
	}

	if (churches.contains(context.predecessor)) {
		const church = churches.get(context.predecessor);

		if (church) {
			church.donations = u128.add(church.donations, context.attachedDeposit);
			churches.set(context.predecessor, church);

			return response([
				'Thank you for ' + context.attachedDeposit.toString() + ' yoctoNEAR donation!', 
				context.predecessor + ' have collected ' + church.donations.toString() + ' yoctoNEAR in donations!',
			], true);
		} else {
			return response(["This shouldn't happen!"], false);
		}
	} else {
		const church = new Church();

		church.donations = u128.add(church.donations, context.attachedDeposit);

		churches.set(context.predecessor, church);

		return response([
			'Thank you for ' + context.attachedDeposit.toString() + ' yoctoNEAR donation!', 
			context.predecessor + ' have collected ' + church.donations.toString() + ' yoctoNEAR in donations!',
		], true);
	}
}

export function viewChurches(): MapEntry<string, Church>[] {
	return churches.entries().sort((a, b) => {
		if (a.value.donations > b.value.donations) {
			return -1;
		}
		if (a.value.donations < b.value.donations) {
			return 1;
		}
		return 0;
	});
}
