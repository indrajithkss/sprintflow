import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { 
  LucideAngularModule, 
  LayoutDashboard, 
  FolderKanban,
  CircleCheckBig,
  Clock3, 
  TriangleAlert,
  Sparkles, 
  Plus, 
  Trash2, 
  SquarePen, 
  Search, 
  Settings, 
  UserCircle,
  Bell,
  LogOut, 
  X,
  ClipboardList,
  Clock,
  TrendingUp,
  CheckCircle
} from 'lucide-angular';

import { routes } from './app.routes';

import { authInterceptor } from './core/interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
    ),
    importProvidersFrom(
      LucideAngularModule.pick({
        LayoutDashboard,
        FolderKanban,
        CircleCheckBig,
        Clock3,
        TriangleAlert,
        Sparkles,
        Plus,
        Trash2,
        SquarePen,
        Search,
        Settings,
        UserCircle,
        Bell,
        LogOut,
        X,
        ClipboardList,
        Clock,
        TrendingUp,
        CheckCircle
      })
    )
  ]
};