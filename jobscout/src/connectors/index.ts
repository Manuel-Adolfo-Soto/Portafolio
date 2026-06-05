import { IJobProvider } from "./types";
import { RemoteOKProvider } from "./remoteok";
import { WellfoundProvider } from "./wellfound";
import { GreenhouseProvider } from "./greenhouse";
import { LeverProvider } from "./lever";
import { RemotiveProvider } from "./remotive";
import { ArbeitnowProvider } from "./arbeitnow";

const providers: Record<string, IJobProvider> = {};

function register(provider: IJobProvider) {
  providers[provider.name] = provider;
}

register(new RemoteOKProvider());
register(new RemotiveProvider());
register(new ArbeitnowProvider());
register(new WellfoundProvider());
register(new GreenhouseProvider());
register(new LeverProvider());

export function getProvider(name: string): IJobProvider | undefined {
  return providers[name];
}

export function getAllProviders(): IJobProvider[] {
  return Object.values(providers);
}

export function getActiveProviders(): IJobProvider[] {
  return Object.values(providers);
}

export type { IJobProvider, RawJob, JobSearchQuery } from "./types";
