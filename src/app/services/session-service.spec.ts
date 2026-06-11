import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController }
  from '@angular/common/http/testing';
import { SessionRequest, SessionService } from './session-service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('SessionService', () => {
  let service: SessionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SessionService,provideZonelessChangeDetection() ]
    });
    service = TestBed.inject(SessionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => { httpMock.verify(); });

  // Test 1 : service créé
  it('devrait être créé', () => {
    expect(service).toBeTruthy();
  });

  // Test 2 : getSessions retourne la liste
  it('devrait retourner la liste des sessions via GET', () => {
    const mockSessions = [
      { id: 1, nom: 'Session Angular', statut: 'OUVERT' },
      { id: 2, nom: 'Session Spring',  statut: 'FERME'  }
    ];

    service.getAllSession().subscribe(sessions => {
      expect(sessions.length).toBe(2);
      expect(sessions[0].nom).toBe('Session Angular');
    });

    const req = httpMock.expectOne(
      'http://localhost:8081/api/public/sessions'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockSessions);
  });

  // Test 3 : createSession envoie POST
  it('devrait créer une session via POST', () => {
    const newSession: SessionRequest = {
    nom: 'Nouvelle Session',
    statut: 'OUVERT',
    dateDebut: '2025-01-10',
    dateFin: '2025-01-20',
    heureDebut: '09:00',
    heureFin: '17:00',
    placesMax: 15,
    mode: 'PRESENTIEL',
    lieu: 'Salle A',
    lienVisio: '',
    materielRequis: '',
    formationCode: 'F001',
    formateurId: null
    };
    const mockCreated = { id: 3, ...newSession };

    service.createSession(newSession).subscribe(result => {
      expect(result.id).toBe(3);
    });

    const req = httpMock.expectOne(
      'http://localhost:8081/api/planificateur/sessions'
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockCreated);
  });
});
