export interface TestRun {
    run: () => void;
}

export class Test implements TestRun {
    public run() : void {
        console.log("test");
    }
}