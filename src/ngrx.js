var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
System.register("store", ['rxjs/subject/BehaviorSubject', 'rxjs/add/operator/map', 'rxjs/add/operator/distinctUntilChanged'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var BehaviorSubject_1;
    var ActionTypes, Store, createStore;
    return {
        setters:[
            function (BehaviorSubject_1_1) {
                BehaviorSubject_1 = BehaviorSubject_1_1;
            },
            function (_1) {},
            function (_2) {}],
        execute: function() {
            exports_1("ActionTypes", ActionTypes = {
                SET_STATE: '@@ngrx/setState',
                INIT: '@@redux/INIT'
            });
            Store = (function (_super) {
                __extends(Store, _super);
                function Store(_reducer, initialState) {
                    _super.call(this, _reducer(initialState, { type: ActionTypes.INIT }));
                    this._reducer = _reducer;
                }
                Store.prototype.next = function (action) {
                    var currentState = this.value;
                    var newState = this._reducer(currentState, action);
                    _super.prototype.next.call(this, newState);
                };
                Store.prototype.select = function (keyOrSelector) {
                    if (typeof keyOrSelector === 'string' ||
                        typeof keyOrSelector === 'number' ||
                        typeof keyOrSelector === 'symbol') {
                        return this.map(function (state) { return state[keyOrSelector]; }).distinctUntilChanged();
                    }
                    else if (typeof keyOrSelector === 'function') {
                        return this.map(keyOrSelector).distinctUntilChanged();
                    }
                    else {
                        throw new TypeError("Store@select Unknown Parameter Type: "
                            + ("Expected type of function or valid key type, got " + typeof keyOrSelector));
                    }
                };
                Store.prototype.dispatch = function (action) {
                    this.next(action);
                };
                Store.prototype.replaceReducer = function (reducer) {
                    this._reducer = reducer;
                    this.dispatch({ type: ActionTypes.INIT });
                };
                Store.prototype.getState = function () {
                    return this.value;
                };
                return Store;
            }(BehaviorSubject_1.BehaviorSubject));
            exports_1("Store", Store);
            exports_1("createStore", createStore = function (reducer, initialState) {
                return new Store(reducer, initialState);
            });
        }
    }
});
System.register("interfaces", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("utils", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var combineReducers, compose;
    return {
        setters:[],
        execute: function() {
            exports_3("combineReducers", combineReducers = function (reducers) {
                var reducerKeys = Object.keys(reducers);
                return function (state, action) {
                    if (state === void 0) { state = {}; }
                    var hasChanged = false;
                    var nextState = {};
                    for (var i = 0; i < reducerKeys.length; i++) {
                        var key = reducerKeys[i];
                        var reducer = reducers[key];
                        var previousState = state[key];
                        var newState = reducer(previousState, action);
                        nextState[key] = newState;
                        hasChanged = hasChanged || previousState !== newState;
                    }
                    return hasChanged ? nextState : state;
                };
            });
            exports_3("compose", compose = function () {
                var funcs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    funcs[_i - 0] = arguments[_i];
                }
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    if (funcs.length === 0) {
                        return args[0];
                    }
                    var last = funcs[funcs.length - 1];
                    var rest = funcs.slice(0, -1);
                    return rest.reduceRight(function (composed, f) { return f(composed); }, last.apply(void 0, args));
                };
            });
        }
    }
});
System.register("@ngrx/store", ["store", "utils"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_4(exports);
    }
    return {
        setters:[
            function (store_1_1) {
                exportStar_1(store_1_1);
            },
            function (utils_1_1) {
                exportStar_1(utils_1_1);
            }],
        execute: function() {
        }
    }
});
System.register("instrument", [], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var lodash_1;
    var ActionTypes, ActionCreators, INIT_ACTION;
    /**
    * Computes the next entry in the log by applying an action.
    */
    function computeNextEntry(reducer, action, state, error) {
        if (error) {
            return {
                state: state,
                error: 'Interrupted by an error up the chain'
            };
        }
        var nextState = state;
        var nextError;
        try {
            nextState = reducer(state, action);
        }
        catch (err) {
            nextError = err.toString();
            if (typeof window === 'object' && typeof window.chrome !== 'undefined') {
                // In Chrome, rethrowing provides better source map support
                setTimeout(function () { throw err; });
            }
            else {
                console.error(err.stack || err);
            }
        }
        return {
            state: nextState,
            error: nextError
        };
    }
    /**
    * Runs the reducer on invalidated actions to get a fresh computation log.
    */
    function recomputeStates(computedStates, minInvalidatedStateIndex, reducer, committedState, actionsById, stagedActionIds, skippedActionIds) {
        // Optimization: exit early and return the same reference
        // if we know nothing could have changed.
        if (minInvalidatedStateIndex >= computedStates.length &&
            computedStates.length === stagedActionIds.length) {
            return computedStates;
        }
        var nextComputedStates = computedStates.slice(0, minInvalidatedStateIndex);
        for (var i = minInvalidatedStateIndex; i < stagedActionIds.length; i++) {
            var actionId = stagedActionIds[i];
            var action = actionsById[actionId].action;
            var previousEntry = nextComputedStates[i - 1];
            var previousState = previousEntry ? previousEntry.state : committedState;
            var previousError = previousEntry ? previousEntry.error : undefined;
            var shouldSkip = skippedActionIds.indexOf(actionId) > -1;
            var entry = shouldSkip ?
                previousEntry :
                computeNextEntry(reducer, action, previousState, previousError);
            nextComputedStates.push(entry);
        }
        return nextComputedStates;
    }
    /**
    * Lifts an app's action into an action on the lifted store.
    */
    function liftAction(action) {
        return ActionCreators.performAction(action);
    }
    exports_5("liftAction", liftAction);
    /**
    * Creates a history state reducer from an app's reducer.
    */
    function liftReducerWith(reducer, initialCommittedState, monitorReducer) {
        var initialLiftedState = {
            monitorState: monitorReducer(undefined, {}),
            nextActionId: 1,
            actionsById: { 0: liftAction(INIT_ACTION) },
            stagedActionIds: [0],
            skippedActionIds: [],
            committedState: initialCommittedState,
            currentStateIndex: 0,
            computedStates: []
        };
        /**
        * Manages how the history actions modify the history state.
        */
        return function (liftedState, liftedAction) {
            if (liftedState === void 0) { liftedState = initialLiftedState; }
            var monitorState = liftedState.monitorState, actionsById = liftedState.actionsById, nextActionId = liftedState.nextActionId, stagedActionIds = liftedState.stagedActionIds, skippedActionIds = liftedState.skippedActionIds, committedState = liftedState.committedState, currentStateIndex = liftedState.currentStateIndex, computedStates = liftedState.computedStates;
            // By default, agressively recompute every state whatever happens.
            // This has O(n) performance, so we'll override this to a sensible
            // value whenever we feel like we don't have to recompute the states.
            var minInvalidatedStateIndex = 0;
            switch (liftedAction.type) {
                case ActionTypes.RESET: {
                    // Get back to the state the store was created with.
                    actionsById = { 0: liftAction(INIT_ACTION) };
                    nextActionId = 1;
                    stagedActionIds = [0];
                    skippedActionIds = [];
                    committedState = initialCommittedState;
                    currentStateIndex = 0;
                    computedStates = [];
                    break;
                }
                case ActionTypes.COMMIT: {
                    // Consider the last committed state the new starting point.
                    // Squash any staged actions into a single committed state.
                    actionsById = { 0: liftAction(INIT_ACTION) };
                    nextActionId = 1;
                    stagedActionIds = [0];
                    skippedActionIds = [];
                    committedState = computedStates[currentStateIndex].state;
                    currentStateIndex = 0;
                    computedStates = [];
                    break;
                }
                case ActionTypes.ROLLBACK: {
                    // Forget about any staged actions.
                    // Start again from the last committed state.
                    actionsById = { 0: liftAction(INIT_ACTION) };
                    nextActionId = 1;
                    stagedActionIds = [0];
                    skippedActionIds = [];
                    currentStateIndex = 0;
                    computedStates = [];
                    break;
                }
                case ActionTypes.TOGGLE_ACTION: {
                    // Toggle whether an action with given ID is skipped.
                    // Being skipped means it is a no-op during the computation.
                    var actionId_1 = liftedAction.id;
                    var index = skippedActionIds.indexOf(actionId_1);
                    if (index === -1) {
                        skippedActionIds = [actionId_1].concat(skippedActionIds);
                    }
                    else {
                        skippedActionIds = skippedActionIds.filter(function (id) { return id !== actionId_1; });
                    }
                    // Optimization: we know history before this action hasn't changed
                    minInvalidatedStateIndex = stagedActionIds.indexOf(actionId_1);
                    break;
                }
                case ActionTypes.JUMP_TO_STATE: {
                    // Without recomputing anything, move the pointer that tell us
                    // which state is considered the current one. Useful for sliders.
                    currentStateIndex = liftedAction.index;
                    // Optimization: we know the history has not changed.
                    minInvalidatedStateIndex = Infinity;
                    break;
                }
                case ActionTypes.SWEEP: {
                    // Forget any actions that are currently being skipped.
                    stagedActionIds = _.difference(stagedActionIds, skippedActionIds);
                    skippedActionIds = [];
                    currentStateIndex = Math.min(currentStateIndex, stagedActionIds.length - 1);
                    break;
                }
                case ActionTypes.PERFORM_ACTION: {
                    if (currentStateIndex === stagedActionIds.length - 1) {
                        currentStateIndex++;
                    }
                    var actionId = nextActionId++;
                    // Mutation! This is the hottest path, and we optimize on purpose.
                    // It is safe because we set a new key in a cache dictionary.
                    actionsById[actionId] = liftedAction;
                    stagedActionIds = stagedActionIds.concat([actionId]);
                    // Optimization: we know that only the new action needs computing.
                    minInvalidatedStateIndex = stagedActionIds.length - 1;
                    break;
                }
                case ActionTypes.IMPORT_STATE: {
                    // Completely replace everything.
                    (_a = liftedAction.nextLiftedState, monitorState = _a.monitorState, actionsById = _a.actionsById, nextActionId = _a.nextActionId, stagedActionIds = _a.stagedActionIds, skippedActionIds = _a.skippedActionIds, committedState = _a.committedState, currentStateIndex = _a.currentStateIndex, computedStates = _a.computedStates, _a);
                    break;
                }
                case '@@redux/INIT': {
                    // Always recompute states on hot reload and init.
                    minInvalidatedStateIndex = 0;
                    break;
                }
                default: {
                    // If the action is not recognized, it's a monitor action.
                    // Optimization: a monitor action can't change history.
                    minInvalidatedStateIndex = Infinity;
                    break;
                }
            }
            computedStates = recomputeStates(computedStates, minInvalidatedStateIndex, reducer, committedState, actionsById, stagedActionIds, skippedActionIds);
            monitorState = monitorReducer(monitorState, liftedAction);
            return {
                monitorState: monitorState,
                actionsById: actionsById,
                nextActionId: nextActionId,
                stagedActionIds: stagedActionIds,
                skippedActionIds: skippedActionIds,
                committedState: committedState,
                currentStateIndex: currentStateIndex,
                computedStates: computedStates
            };
            var _a;
        };
    }
    exports_5("liftReducerWith", liftReducerWith);
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }],
        execute: function() {
            exports_5("ActionTypes", ActionTypes = {
                PERFORM_ACTION: 'PERFORM_ACTION',
                RESET: 'RESET',
                ROLLBACK: 'ROLLBACK',
                COMMIT: 'COMMIT',
                SWEEP: 'SWEEP',
                TOGGLE_ACTION: 'TOGGLE_ACTION',
                JUMP_TO_STATE: 'JUMP_TO_STATE',
                IMPORT_STATE: 'IMPORT_STATE'
            });
            /**
            * Action creators to change the History state.
            */
            exports_5("ActionCreators", ActionCreators = {
                performAction: function (action) {
                    if (typeof action.type === 'undefined') {
                        throw new Error('Actions may not have an undefined "type" property. ' +
                            'Have you misspelled a constant?');
                    }
                    return { type: ActionTypes.PERFORM_ACTION, action: action, timestamp: Date.now() };
                },
                reset: function () {
                    return { type: ActionTypes.RESET, timestamp: Date.now() };
                },
                rollback: function () {
                    return { type: ActionTypes.ROLLBACK, timestamp: Date.now() };
                },
                commit: function () {
                    return { type: ActionTypes.COMMIT, timestamp: Date.now() };
                },
                sweep: function () {
                    return { type: ActionTypes.SWEEP };
                },
                toggleAction: function (id) {
                    return { type: ActionTypes.TOGGLE_ACTION, id: id };
                },
                jumpToState: function (index) {
                    return { type: ActionTypes.JUMP_TO_STATE, index: index };
                },
                importState: function (nextLiftedState) {
                    return { type: ActionTypes.IMPORT_STATE, nextLiftedState: nextLiftedState };
                }
            });
            exports_5("INIT_ACTION", INIT_ACTION = { type: '@@INIT' });
        }
    }
});
System.register("log-monitor/log-entry-item", [], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("log-monitor/log-monitor-button", ['angular2/core'], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_1;
    var LogMonitorButton;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            LogMonitorButton = (function () {
                function LogMonitorButton() {
                    this.action = new core_1.EventEmitter();
                }
                LogMonitorButton.prototype.handleAction = function ($event) {
                    if (!this.disabled) {
                        this.action.next({});
                    }
                    $event.stopPropagation();
                    return false;
                };
                __decorate([
                    core_1.HostBinding('class.disabled'),
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], LogMonitorButton.prototype, "disabled", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], LogMonitorButton.prototype, "action", void 0);
                __decorate([
                    core_1.HostListener('click', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Event]), 
                    __metadata('design:returntype', void 0)
                ], LogMonitorButton.prototype, "handleAction", null);
                LogMonitorButton = __decorate([
                    core_1.Component({
                        selector: 'log-monitor-button',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        encapsulation: core_1.ViewEncapsulation.Emulated,
                        template: "\n    <ng-content></ng-content>\n  ",
                        styles: ["\n    :host{\n      flex-grow: 1;\n      display: inline-block;\n      font-family: 'monaco', 'Consolas', 'Lucida Console', monospace;\n      cursor: pointer;\n      font-weight: bold;\n      border-radius: 3px;\n      padding: 4px 8px;\n      margin: 5px 3px 5px 3px;\n      font-size: 0.8em;\n      color: white;\n      text-decoration: none;\n      background-color: #4F5A65;\n    }\n\n    :host.disabled{\n      opacity: 0.2;\n      cursor: text;\n      background-color: transparent;\n    }\n  "]
                    }), 
                    __metadata('design:paramtypes', [])
                ], LogMonitorButton);
                return LogMonitorButton;
            }());
            exports_7("LogMonitorButton", LogMonitorButton);
        }
    }
});
System.register("log-monitor/log-monitor-entry", ['angular2/core', "log-monitor/log-monitor-button"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var core_2, log_monitor_button_1;
    var LogMonitorEntry;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (log_monitor_button_1_1) {
                log_monitor_button_1 = log_monitor_button_1_1;
            }],
        execute: function() {
            LogMonitorEntry = (function () {
                function LogMonitorEntry() {
                    this.toggle = new core_2.EventEmitter();
                }
                LogMonitorEntry.prototype.handleToggle = function () {
                    this.toggle.next({ id: this.item.actionId });
                };
                LogMonitorEntry.prototype.logPayload = function () {
                    console.log(this.item.action);
                };
                LogMonitorEntry.prototype.logState = function () {
                    console.log(this.item.state);
                };
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Object)
                ], LogMonitorEntry.prototype, "item", void 0);
                __decorate([
                    core_2.Output(), 
                    __metadata('design:type', Object)
                ], LogMonitorEntry.prototype, "toggle", void 0);
                __decorate([
                    core_2.HostListener('click'), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], LogMonitorEntry.prototype, "handleToggle", null);
                LogMonitorEntry = __decorate([
                    core_2.Component({
                        selector: 'log-monitor-entry',
                        changeDetection: core_2.ChangeDetectionStrategy.OnPush,
                        directives: [log_monitor_button_1.LogMonitorButton],
                        encapsulation: core_2.ViewEncapsulation.Emulated,
                        template: "\n    <div class=\"title-bar\" [ngClass]=\"{ collapsed: item.collapsed }\">\n      {{ item.action.type }}\n    </div>\n    <div class=\"action-bar\" *ngIf=\"!item.collapsed\">\n      <log-monitor-button (action)=\"logPayload($event)\">\n        Log Payload\n      </log-monitor-button>\n      <log-monitor-button (action)=\"logState($event)\">\n        Log State\n      </log-monitor-button>\n    </div>\n  ",
                        styles: ["\n    :host{\n      color: #FFFFFF;\n      background-color: #4F5A65;\n      cursor: pointer;\n    }\n    .title-bar{\n      padding: 8px 0 7px 16px;\n      background-color: rgba(0,0,0,0.1);\n    }\n    .action-bar{\n      padding: 8px 0 7px;\n      text-align: center;\n    }\n    .collapsed{\n      text-decoration: line-through;\n      font-style: italic;\n      opacity: 0.5;\n    }\n    log-monitor-button{\n      opacity: 0.6;\n    }\n  "]
                    }), 
                    __metadata('design:paramtypes', [])
                ], LogMonitorEntry);
                return LogMonitorEntry;
            }());
            exports_8("LogMonitorEntry", LogMonitorEntry);
        }
    }
});
System.register("log-monitor/log-monitor", ['angular2/core', "store", "@ngrx/devtools", "log-monitor/log-monitor-entry", "log-monitor/log-monitor-button", "instrument"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_3, store_2, devtools_1, log_monitor_entry_1, log_monitor_button_2, instrument_1;
    var LogMonitor;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (store_2_1) {
                store_2 = store_2_1;
            },
            function (devtools_1_1) {
                devtools_1 = devtools_1_1;
            },
            function (log_monitor_entry_1_1) {
                log_monitor_entry_1 = log_monitor_entry_1_1;
            },
            function (log_monitor_button_2_1) {
                log_monitor_button_2 = log_monitor_button_2_1;
            },
            function (instrument_1_1) {
                instrument_1 = instrument_1_1;
            }],
        execute: function() {
            LogMonitor = (function () {
                function LogMonitor(store) {
                    this.store = store;
                    this.canRevert$ = store.lifted.map(function (s) { return !(s.computedStates.length > 1); });
                    this.canSweep$ = store.lifted.map(function (s) { return !(s.skippedActionIds.length > 0); });
                    this.canCommit$ = store.lifted.map(function (s) { return !(s.computedStates.length > 1); });
                    this.items$ = store.lifted
                        .map(function (_a) {
                        var actionsById = _a.actionsById, skippedActionIds = _a.skippedActionIds, stagedActionIds = _a.stagedActionIds, computedStates = _a.computedStates;
                        var actions = [];
                        for (var i = 0; i < stagedActionIds.length; i++) {
                            var actionId = stagedActionIds[i];
                            var action = actionsById[actionId].action;
                            var _b = computedStates[i], state = _b.state, error = _b.error;
                            var previousState = void 0;
                            if (i > 0) {
                                previousState = computedStates[i - 1].state;
                            }
                            actions.push({
                                key: actionId,
                                collapsed: skippedActionIds.indexOf(actionId) > -1,
                                action: action,
                                actionId: actionId,
                                state: state,
                                previousState: previousState,
                                error: error
                            });
                        }
                        return actions.slice(1);
                    });
                }
                LogMonitor.prototype.handleToggle = function (id) {
                    this.store.lifted.dispatch(instrument_1.ActionCreators.toggleAction(id));
                };
                LogMonitor.prototype.handleReset = function () {
                    this.store.lifted.dispatch(instrument_1.ActionCreators.reset());
                };
                LogMonitor.prototype.handleRollback = function () {
                    this.store.lifted.dispatch(instrument_1.ActionCreators.rollback());
                };
                LogMonitor.prototype.handleSweep = function () {
                    this.store.lifted.dispatch(instrument_1.ActionCreators.sweep());
                };
                LogMonitor.prototype.handleCommit = function () {
                    this.store.lifted.dispatch(instrument_1.ActionCreators.commit());
                };
                LogMonitor = __decorate([
                    core_3.Component({
                        selector: 'log-monitor',
                        directives: [log_monitor_entry_1.LogMonitorEntry, log_monitor_button_2.LogMonitorButton],
                        encapsulation: core_3.ViewEncapsulation.Emulated,
                        changeDetection: core_3.ChangeDetectionStrategy.OnPush,
                        styles: ["\n    :host {\n      display: block;\n      background-color: #2A2F3A;\n      font-family: 'monaco', 'Consolas', 'Lucida Console', monospace;\n      position: absolute;\n      top: 0;\n      right: 0;\n      overflow-y: hidden;\n      width: 100%;\n      height: 100%;\n      max-width: 300px;\n      direction: ltr;\n    }\n\n    .button-bar{\n      text-align: center;\n      border-bottom-width: 1px;\n      border-bottom-style: solid;\n      border-color: transparent;\n      z-index: 1;\n      display: flex;\n      flex-direction: row;\n      padding: 0 4px;\n    }\n\n    .elements{\n      position: absolute;\n      left: 0;\n      right: 0;\n      top: 38px;\n      bottom: 0;\n      overflow-x: hidden;\n      overflow-y: auto;\n    }\n  "],
                        template: "\n    <div class=\"button-bar\">\n      <log-monitor-button (action)=\"handleReset()\" [disabled]=\"canReset$ | async\">\n        Reset\n      </log-monitor-button>\n\n      <log-monitor-button (action)=\"handleRollback()\">\n        Revert\n      </log-monitor-button>\n\n      <log-monitor-button (action)=\"handleSweep()\" [disabled]=\"canSweep$ | async\">\n        Sweep\n      </log-monitor-button>\n\n      <log-monitor-button (action)=\"handleCommit()\" [disabled]=\"canCommit$ | async\">\n        Commit\n      </log-monitor-button>\n    </div>\n    <div class=\"elements\">\n      <log-monitor-entry\n        *ngFor=\"#item of (items$ | async)\"\n        [item]=\"item\"\n        (toggle)=\"handleToggle($event.id)\">\n      </log-monitor-entry>\n    </div>\n  "
                    }),
                    __param(0, core_3.Inject(store_2.Store)), 
                    __metadata('design:paramtypes', [devtools_1.LiftedStore])
                ], LogMonitor);
                return LogMonitor;
            }());
            exports_9("LogMonitor", LogMonitor);
        }
    }
});
System.register("@ngrx/devtools", ['rxjs/subject/BehaviorSubject', "store", "instrument", "log-monitor/log-monitor"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var BehaviorSubject_2, store_3, instrument_2;
    var LiftedStore;
    function computeCurrentState(_a) {
        var computedStates = _a.computedStates, currentStateIndex = _a.currentStateIndex;
        return computedStates[currentStateIndex].state;
    }
    function instrument(monitorReducer) {
        if (monitorReducer === void 0) { monitorReducer = function () { return undefined; }; }
        return function (createStore) { return function (reducer, initialState) {
            return new LiftedStore(reducer, initialState, monitorReducer);
        }; };
    }
    exports_10("instrument", instrument);
    var exportedNames_1 = {
        'LiftedStore': true,
        'instrument': true
    };
    function exportStar_2(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_10(exports);
    }
    return {
        setters:[
            function (BehaviorSubject_2_1) {
                BehaviorSubject_2 = BehaviorSubject_2_1;
            },
            function (store_3_1) {
                store_3 = store_3_1;
            },
            function (instrument_2_1) {
                instrument_2 = instrument_2_1;
            },
            function (log_monitor_1_1) {
                exportStar_2(log_monitor_1_1);
            }],
        execute: function() {
            LiftedStore = (function (_super) {
                __extends(LiftedStore, _super);
                function LiftedStore(reducer, initialState, monitorReducer) {
                    var _this = this;
                    var liftedReducer = instrument_2.liftReducerWith(reducer, initialState, monitorReducer);
                    var lifted = new store_3.Store(liftedReducer);
                    _super.call(this, computeCurrentState(lifted.getState()));
                    this.lifted = lifted;
                    lifted.map(computeCurrentState).subscribe(function (state) { return _super.prototype.next.call(_this, state); });
                }
                LiftedStore.prototype.select = function () {
                    return this.lifted.select.apply(this, arguments);
                };
                LiftedStore.prototype.dispatch = function (action) {
                    this.lifted.dispatch(instrument_2.liftAction(action));
                };
                LiftedStore.prototype.next = function (action) {
                    this.lifted.next(instrument_2.liftAction(action));
                };
                LiftedStore.prototype.replaceReducer = function (reducer) {
                    this.lifted.replaceReducer(instrument_2.liftReducerWith(reducer));
                };
                LiftedStore.prototype.getState = function () {
                    return this.value;
                };
                return LiftedStore;
            }(BehaviorSubject_2.BehaviorSubject));
            exports_10("LiftedStore", LiftedStore);
        }
    }
});
