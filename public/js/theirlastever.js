// DEBUG
var trace = function(msg){ console.log(msg); };

var system;

class Enviroment
{
	constructor()
	{
		this.time_main = {};
		this.time_keep = {};
		this.time_keep.H = 0;
		this.time_keep.M = 0;
		this.time_keep.S = 0;
	}

	updater()
	{
		// trace(this.time_keep.H + " " + this.time_keep.M + " " + this.time_keep.S);

		this.time_main = new Date();
		this.time_H = this.time_main.getHours();
		this.time_M = this.time_main.getMinutes();
		this.time_S = this.time_main.getSeconds();

		this.writer();
	}

	writer()
	{
		this.timeChange = false;

		if(this.time_keep.H !== this.time_H)
		{
			this.time_keep.H = this.time_H;
			this.timeChange = true;

			trace("changeH");
		}

		if(this.time_keep.M !== this.time_M)
		{
			this.time_keep.M = this.time_M;
			this.timeChange = true;

			trace("changeM");
		}

		if(this.time_keep.S !== this.time_S)
		{
			this.time_keep.S = this.time_S;
			this.timeChange = true;

			trace("changeS");
		}

		if(this.timeChange)
		{
			this.reader();
		}
	}

	// DEBUG ONLY
	reader()
	{
		trace(this.time_H + " // " + this.time_M + " // " + this.time_S);
	}



}

function pageLoad_init()
{
	trace("pageLoad_init();");

	init_main();
}

function init_main()
{
	system = {};

	system.enviroment = new Enviroment();
	system.enterFrameRun = false;
	system.enterFrameLoopList = [];
	system.enterFrameFunct = loop_system_update;

	loop_system_add(enviroment_update);

	loop_system_apply(true);
}

function loop_system_add(funct)
{
	system.enterFrameLoopList.push(funct);
}

function loop_system_apply(run)
{
	if(run)
	{
		if(!system.enterFrameRun)
		{
			system.enterFrameRun = true;

			window.requestAnimationFrame(system.enterFrameFunct);
		}
	}

	else
	{
		system.enterFrameRun = false;

		window.cancelAnimationFrame(system.enterFrameFunct);
	}
}

function loop_system_update()
{
	for(var i in system.enterFrameLoopList)
	{
		system.enterFrameLoopList[i]();
	}

	if(system.enterFrameRun)
	{
		window.requestAnimationFrame(system.enterFrameFunct);
	}
}

function enviroment_update()
{
	system.enviroment.updater();
}



