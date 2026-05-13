import { KeyValuePipe, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ViewChild,
  ChangeDetectorRef,
  Inject,
  PLATFORM_ID,
  OnInit,
  AfterViewInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput, CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ModalEvent } from '../../shared/components/ui/modal-event/modal-event';
import { EventService } from '../../services/event-service';

interface CalendarEvent extends EventInput {
  extendedProps: {
    calendar: string;
  };
}

@Component({
  selector: 'app-calender',
  imports: [FormsModule, KeyValuePipe, FullCalendarModule, ModalEvent],
  templateUrl: './calender.html',
  styleUrl: './calender.css',
})
export class Calender implements OnInit, AfterViewInit {

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  events: CalendarEvent[] = [];
  selectedEvent: CalendarEvent | null = null;
  eventTitle = '';
  eventStartDate = '';
  eventEndDate = '';
  eventLevel = '';
  isOpen = false;
  loading = false;
  error: string | null = null;
  isBrowser: boolean;

  calendarsEvents: Record<string, string> = {
    Danger: 'danger',
    Success: 'success',
    Primary: 'primary',
    Warning: 'warning'
  };

  calendarOptions: CalendarOptions;

  constructor(
    private eventService: EventService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next addEventButton',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      selectable: true,
      events: [],

      // ✅ NgZone.run() force Angular à détecter les changements
      select: (info) => {
        this.handleDateSelect(info);
        this.cdr.detectChanges();
      },
      eventClick: (info) => {
        this.handleEventClick(info);
        this.cdr.detectChanges();
      },
      customButtons: {
        addEventButton: {
          text: 'Add Event +',
          click: () => {
            this.openModal();
            this.cdr.detectChanges();
          }
        }
      },
      eventContent: (arg) => this.renderEventContent(arg)
    };
  }

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.loadEvents();
    }
  }

  loadEvents() {
    this.loading = true;
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data.map(ev => ({
          id: ev.id,
          title: ev.title,
          start: ev.start,
          end: ev.end,
          extendedProps: { calendar: ev.calendar }
        }));

        const calendarApi = this.calendarComponent?.getApi();
        if (calendarApi) {
          calendarApi.removeAllEvents();
          calendarApi.addEventSource(this.events);
        }

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.resetModalFields();
    this.eventStartDate = selectInfo.startStr.substring(0, 10);
    this.eventEndDate = (selectInfo.endStr || selectInfo.startStr).substring(0, 10);
    this.openModal();
  }

  handleEventClick(clickInfo: EventClickArg) {
    const event = clickInfo.event as any;
    const toDateInput = (str: string): string => str ? str.substring(0, 10) : '';

    this.selectedEvent = {
      id: event.id,
      title: event.title,
      start: event.startStr,
      end: event.endStr,
      extendedProps: { calendar: event.extendedProps.calendar }
    };
    this.eventTitle = event.title;
    this.eventStartDate = toDateInput(event.startStr);
    this.eventEndDate = toDateInput(event.endStr);
    this.eventLevel = event.extendedProps.calendar;
    this.openModal();
  }

  handleAddOrUpdateEvent() {
    if (this.selectedEvent) {
      const updated = {
        title: this.eventTitle,
        start: this.eventStartDate,
        end: this.eventEndDate,
        calendar: this.eventLevel
      };
      this.eventService.updateEvent(this.selectedEvent.id as any, updated).subscribe({
        next: () => {
          this.loadEvents();
          this.closeModal();
        },
        error: (err) => this.error = err.message
      });
    } else {
      const newEvent = {
        title: this.eventTitle,
        start: this.eventStartDate,
        end: this.eventEndDate,
        calendar: this.eventLevel
      };
      this.eventService.addEvent(newEvent).subscribe({
        next: () => {
          this.loadEvents();
          this.closeModal();
        },
        error: (err) => this.error = err.message
      });
    }
  }

  resetModalFields() {
    this.eventTitle = '';
    this.eventStartDate = '';
    this.eventEndDate = '';
    this.eventLevel = '';
    this.selectedEvent = null;
  }

  openModal() {
    this.isOpen = true;
    this.cdr.detectChanges();
  }

  closeModal() {
    this.isOpen = false;
    this.resetModalFields();
  }

  renderEventContent(eventInfo: any) {
    const colorClass = `fc-bg-${eventInfo.event.extendedProps.calendar?.toLowerCase()}`;
    return {
      html: `
        <div class="event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm">
          <div class="fc-daygrid-event-dot"></div>
          <div class="fc-event-time">${eventInfo.timeText || ''}</div>
          <div class="fc-event-title">${eventInfo.event.title}</div>
        </div>
      `
    };
  }
}