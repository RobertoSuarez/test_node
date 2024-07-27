import { Component, OnDestroy, OnInit } from '@angular/core';
import { TurnService } from 'app/core/turn/turn.service';
import { TurnTotal } from 'app/core/turn/turn.types';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    user: User;

    // total de turnos atendidos
    totalShifts: number = 34;



    constructor(
        private _userService: UserService,
        private _turnService: TurnService,
    ) {}


    ngOnInit(): void {
        this._userService.user$.pipe(takeUntil(this._unsubscribeAll)).subscribe(user => {
            this.user = user;
        });

        this._turnService.getTotalTurns().subscribe((res: TurnTotal) => {
            this.totalShifts = res.total;
        })
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
