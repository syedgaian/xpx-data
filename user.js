const { faker } = require("@faker-js/faker");

const fs = require("node:fs");

function randomFunctionGenerator(arr) {
	return () => {
		return arr[Math.floor(Math.random() * arr.length)];
	};
}

function getRandomAccountType() {
	const accountTypes = ["free", "gold", "platinum", "silver"];
	return accountTypes[Math.floor(Math.random() * accountTypes.length)];
}

function getRandomPaymentStatus() {
	const paymentStatus = ["Done", "Failed", "Pending", "Revoked"];
	const subscription = {
		Done: "Active",
		Failed: "Inactive",
		Pending: "Pending",
		Revoked: "Revoked",
	};
	const payment =
		paymentStatus[Math.floor(Math.random() * paymentStatus.length)];
	return {
		payment,
		subscription: subscription[payment],
	};
}

function getRandomSecondaryAccounts() {
	const length = Math.floor(Math.random() * 2) + 1;
	const arr = [];
	for (let i = 0; i < length; i++) {
		arr.push(faker.internet.userName());
	}
	return arr;
}

function createRandomUser() {
	const res = getRandomPaymentStatus();
	return {
		subscriberId: faker.string.uuid(),
		userName: faker.internet.userName(),
		email: faker.internet.email(),
		avatar: faker.image.avatar(),
		createdAt: faker.date.past(),
		dateOfRegistration: faker.date.past(),
		zipCode: faker.location.zipCode(),
		country: faker.location.country(),
		city: faker.location.city(),
		state: faker.location.state(),
		streetAddress: faker.location.streetAddress(),
		contact: faker.phone.number(),
		accountType: getRandomAccountType(),
		subscriptionStatus: res.subscription,
		paymentStatus: res.payment,
		secondaryAccounts: getRandomSecondaryAccounts(),
		tenantId: "ba77896f-7c1f-4501-b4f6-547a7d26dde6",
		moscribeId: faker.string.uuid(),
	};
}

const communications = [];

const subs = require("./subscribers.json");

function getRandomCommunicationType() {
	const types = ["IT ops", "HR", "Finance", "Dev ops", "QA"];
	return types[Math.floor(Math.random() * types.length)];
}

function createRandomCommunication() {
	// biome-ignore lint/complexity/noForEach: <explanation>
	subs.forEach((sub) => {
		const randomNumber = Math.floor(5 + Math.random() * 10);
		for (let i = 0; i <= randomNumber; i++) {
			communications.push({
				communicationID: faker.string.uuid(),
				subscriberID: sub.subscriberId,
				date: faker.date.past(),
				description: faker.company.catchPhrase(),
				communicationType: getRandomCommunicationType(),
				representativeName: faker.person.firstName(),
			});
		}
	});
}

function getRandomFrequency() {
	fer = ["Monthly", "Yearly", "Quarterly"];
	return fer[Math.floor(Math.random() * fer.length)];
}

function getRandomStatus() {
	fer = ["Active", "Inactive"];
	return fer[Math.floor(Math.random() * fer.length)];
}

const subscriptions = require("./subscription.json");
// createRandomSubscriptionDetails();
// const USERS = faker.helpers.multiple(createRandomCommunication, {
// 	count: 100,
// });

function createRandomSubscriptionDetails() {
	// biome-ignore lint/complexity/noForEach: <explanation>
	subs.forEach((sub) => {
		const created = faker.date.past();
		const startDate = faker.date.between({ from: created, to: new Date() });
		communications.push({
			subscriptionID: faker.string.uuid(),
			subscriberID: sub.subscriberId,
			nextChargeDate: faker.date.future(),
			expiryDate: faker.date.future(),
			trialPeriod: faker.date.future(),
			created: created,
			startDate: startDate,
			amount: Number(faker.finance.amount()),
			planName: sub.accountType,
			frequency: getRandomFrequency(),
			customerEmail: sub.email,
			brand: faker.finance.creditCardIssuer(),
			cardNumber: faker.finance.creditCardNumber(),
			status: getRandomStatus(),
		});
	});
}

function createRandomSubscriptionBills() {
	// biome-ignore lint/complexity/noForEach: <explanation>
	subscriptions.forEach((sub) => {
		communications.push({
			subscriptionID: sub.subscriptionID,
			billId: faker.string.uuid(),
			date: sub.nextChargeDate,
			amount: sub.amount,
			plan: sub.planName,
			status: sub.status,
		});
	});
}

const getRandomPlatform = randomFunctionGenerator([
	"windows",
	"linux",
	"mac",
	"android",
	"ios",
]);

function getRandomDeviceName() {
	const brands = [
		"LG",
		"Samsung",
		"Sony",
		"Panasonic",
		"Philips",
		"Toshiba",
		"Vizio",
	];
	const deviceTypes = [
		"TV",
		"Smartphone",
		"Tablet",
		"Laptop",
		"Monitor",
		"Smartwatch",
	];

	const randomBrand = brands[Math.floor(Math.random() * brands.length)];
	const randomDeviceType =
		deviceTypes[Math.floor(Math.random() * deviceTypes.length)];

	return `${randomBrand} ${randomDeviceType}`;
}

const getRandomSecuritySignal = randomFunctionGenerator([
	"Secure",
	"At Risk",
	"Compromised",
	"Under Investigation",
	"Unknown",
	"Safe",
	"Warning",
	"Critical",
]);

const getRandomDeviceManagement = randomFunctionGenerator([
	"personal",
	"family",
	"admin",
	"organization",
]);

function createRandomDevice() {
	// biome-ignore lint/complexity/noForEach: <explanation>
	subscriptions.forEach((sub) => {
		communications.push({
			deviceId: faker.string.uuid(),
			subscriberId: sub.subscriberID,
			deviceManagement: getRandomDeviceManagement(),
			platform: getRandomPlatform(),
			securitySignal: getRandomSecuritySignal(),
			accessStatus: getRandomStatus(),
		});
	});
}

const devices = require("./devices.json");

function createRandomActivity() {
	// biome-ignore lint/complexity/noForEach: <explanation>
	devices.forEach((sub) => {
		const randomNumber = Math.floor(5 + Math.random() * 20);
		for (let i = 0; i <= randomNumber; i++) {
			communications.push({
				activityId: faker.string.uuid(),
				deviceId: sub.deviceId,
				subscriberId: sub.subscriberID,
				lastLogin: faker.date.past(),
				activity: faker.number.int({ min: 0, max: 100 }),
				screenTime: faker.number.int({ min: 10, max: 1000 }),
				description: faker.company.catchPhrase(),
				fleetDistribution: faker.number.int({ min: 10, max: 20000 }),
				offTime: faker.number.int({ min: 10, max: 1000 }),
				device: getRandomDeviceName(),
			});
		}
	});
}

const getRandomPreferredMode = randomFunctionGenerator([
	"credit-card",
	"debit-card",
	"net-banking",
	"auto-pay",
]);

let newSubs = [];
function updateUsers() {
	subs.forEach((sub) => {
		newSubs.push({
			...sub,
			preferredMode: getRandomPreferredMode(),
		});
	});
}

updateUsers();

fs.writeFileSync("./subscribers.json", JSON.stringify(newSubs));
